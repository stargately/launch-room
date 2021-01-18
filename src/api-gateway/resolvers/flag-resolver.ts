import {
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { v4 as uuid } from "uuid";
import { IContext } from "@/api-gateway/api-gateway";
import { ForbiddenError } from "apollo-server-koa";
import { UserWorkspaceModel } from "@/model/user-workspace-model";

@ObjectType()
class Prerequisite {
  @Field(() => String)
  key: string;

  @Field(() => Int)
  variation: number;
}

@ObjectType()
class Target {
  @Field(() => [String])
  values: Array<string>;

  @Field(() => Int)
  variation: number;
}

@ObjectType()
class Clause {
  @Field(() => String)
  attribute: string;

  @Field(() => String)
  op: string;

  @Field(() => [String])
  values: Array<string>;

  @Field(() => Boolean)
  negate: boolean;
}

@InputType()
class ClauseInput {
  @Field(() => String)
  attribute: string;

  @Field(() => String)
  op: string;

  @Field(() => [String])
  values: Array<string>;

  @Field(() => Boolean)
  negate: boolean;
}

@ObjectType()
class Fallthrough {
  @Field(() => Int)
  variation: number;
}

@ObjectType()
class Rule {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => Int)
  variation: number;

  @Field(() => [Clause])
  clauses: Array<Clause>;

  @Field(() => Boolean)
  trackEvents: boolean;
}

@InputType()
class RuleInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => Int)
  variation: number;

  @Field(() => [ClauseInput])
  clauses: Array<ClauseInput>;

  @Field(() => Boolean)
  trackEvents: boolean;
}

@ObjectType()
class ClientSideAvailability {
  @Field(() => Boolean)
  usingMobileKey: boolean;

  @Field(() => Boolean)
  usingEnvironmentId: boolean;
}

@ObjectType()
class FlagDetails {
  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  version: number;

  @Field(() => Boolean)
  on: boolean;

  @Field(() => Boolean)
  trackEvents: boolean;

  @Field(() => Boolean)
  trackEventsFallthrough: boolean;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Prerequisite)
  prerequisites: Array<Prerequisite>;

  @Field(() => String)
  salt: string;

  @Field(() => String)
  sel: string;

  @Field(() => [Target])
  targets: Array<Target>;

  @Field(() => [Rule], { nullable: true })
  rules: Array<Rule>;

  @Field(() => Fallthrough)
  fallthrough: Fallthrough;

  @Field(() => Int)
  offVariation: number;

  @Field(() => [Boolean])
  variations: Array<boolean>;

  @Field(() => Boolean)
  clientSide: boolean;

  @Field(() => ClientSideAvailability)
  clientSideAvailability: ClientSideAvailability;
}

@ObjectType()
class FlagsStatus {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  limit: number;

  @Field(() => [FlagDetails])
  flags: Array<FlagDetails>;
}

@ArgsType()
class FlagsArgs {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  limit: number;
}

@ArgsType()
class FlagDetailsArgs {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  key: string;
}

@ArgsType()
class UpFlagDetailsArgs {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  key: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [RuleInput], { nullable: true })
  rules: Array<RuleInput>;

  @Field(() => Boolean, { nullable: true })
  on: boolean;

  @Field(() => [Boolean], { nullable: true })
  variations: boolean[];
}

@Resolver()
export class FlagResolver {
  @Authorized()
  @Query(() => FlagsStatus)
  public async flagsStatus(
    @Args() { workspaceId, skip, limit }: FlagsArgs,
    @Ctx() { model: { flagModel, userWorkspace }, userId }: IContext
  ): Promise<FlagsStatus> {
    await assertWorkspace(userWorkspace, userId, workspaceId);

    const query = {
      workspace: workspaceId,
    };

    const [total, flags] = await Promise.all([
      flagModel.estimatedDocumentCount({ workspace: workspaceId }),
      flagModel.find(query).skip(skip).limit(limit).lean(),
    ]);
    for (const f of flags) {
      // @ts-ignore
      f.on = f.isOn;
    }
    return {
      skip,
      limit,
      total,
      // @ts-ignore
      flags,
    };
  }

  @Authorized()
  @Query(() => FlagDetails, { nullable: true })
  public async flagDetails(
    @Args() { workspaceId, key }: FlagDetailsArgs,
    @Ctx() { model: { flagModel, userWorkspace }, userId }: IContext
  ): Promise<FlagDetails | null> {
    await assertWorkspace(userWorkspace, userId, workspaceId);

    const query = {
      workspace: workspaceId,
      key,
    };
    const f = await flagModel.findOne(query).lean();
    // @ts-ignore
    f.on = f.isOn;
    // @ts-ignore
    return f;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async upsertFlag(
    @Args() detail: UpFlagDetailsArgs,
    @Ctx() { model: { flagModel, userWorkspace }, userId }: IContext
  ): Promise<boolean> {
    const { key, workspaceId, rules, on } = detail;

    await assertWorkspace(userWorkspace, userId, workspaceId);

    const flag = await flagModel.findOne({ key, workspace: workspaceId });
    if (flag) {
      const updated = {} as Record<string, unknown>;

      if (rules) {
        for (const r of rules) {
          r.id = r.id || uuid();
        }
        updated.rules = rules;
      }

      if (on !== null && on !== undefined) {
        updated.isOn = on;
      }

      await flagModel.findOneAndUpdate(
        {
          key,
          workspace: workspaceId,
        },
        updated
      );
    } else {
      await flagModel.create({
        workspace: workspaceId,
        clientSideAvailability: {
          usingMobileKey: true,
          usingEnvironmentId: true,
        },
        isOn: true,
        salt: "",
        sel: "",
        targets: [],
        fallthrough: {
          variation: 0,
        },
        ...detail,
      });
    }

    return true;
  }
}

async function assertWorkspace(
  userWorkspace: typeof UserWorkspaceModel,
  userId: string,
  workspaceId: string
) {
  const isInWorkspace = await userWorkspace.findOne({
    user: userId,
    workspace: workspaceId,
  });
  if (!isInWorkspace) {
    throw new ForbiddenError(
      "cannot access workspace that you are not belonging to"
    );
  }
}
