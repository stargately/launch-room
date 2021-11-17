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
import GraphQLJSON from "graphql-type-json";
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
class VariationsObject {
  @Field(() => [Int])
  variations: Array<Record<number, unknown>>;
}

@InputType()
class Variations {
  @Field(() => [Int])
  variations: Array<Record<number, unknown>>;
}

@ObjectType()
class Fallthrough {
  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => VariationsObject, { nullable: true })
  rollout: VariationsObject;
}

@ObjectType()
class Rule {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => [Clause])
  clauses: Array<Clause>;

  @Field(() => Boolean)
  trackEvents: boolean;

  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => VariationsObject, { nullable: true })
  rollout: VariationsObject;
}

@InputType()
class RuleInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => [ClauseInput])
  clauses: Array<ClauseInput>;

  @Field(() => Boolean)
  trackEvents: boolean;

  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => Variations, { nullable: true })
  rollout: Variations;
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

  @Field(() => [GraphQLJSON || Boolean])
  variations: Array<boolean | Record<string, unknown>>;

  @Field(() => Boolean)
  clientSide: boolean;

  @Field(() => ClientSideAvailability)
  clientSideAvailability: ClientSideAvailability;

  @Field(() => Boolean)
  archived: boolean;
}

@InputType()
class FallthroughInput {
  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => Variations, { nullable: true })
  rollout: Variations;
}

@ObjectType()
class FlagsStatus {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Boolean)
  archived: boolean;

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

  @Field(() => Boolean)
  archived: boolean;
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
  variationsBoolean: boolean[];

  @Field(() => [String], { nullable: true })
  variationsJson: string[];

  @Field(() => [Int], { nullable: true })
  variationsNumber: number[];

  @Field(() => [String], { nullable: true })
  variationsString: string[];

  @Field(() => Int, { nullable: true })
  offVariation: number;

  @Field(() => FallthroughInput, { nullable: true })
  fallthrough: FallthroughInput;

  @Field(() => Boolean, { nullable: true })
  archived: boolean;
}

@Resolver()
export class FlagResolver {
  @Authorized()
  @Query(() => FlagsStatus)
  public async flagsStatus(
    @Args() { workspaceId, skip, limit, archived }: FlagsArgs,
    @Ctx() { model: { flagModel, userWorkspace }, userId }: IContext
  ): Promise<FlagsStatus> {
    await assertWorkspace(userWorkspace, userId, workspaceId);

    const query = {
      workspace: workspaceId,
      archived,
    };

    const [total, flags] = await Promise.all([
      flagModel.countDocuments({ workspace: workspaceId, archived }),
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
      archived,
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
    const {
      key,
      workspaceId,
      rules,
      on,
      offVariation,
      fallthrough,
      archived,
    } = detail;

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

      if (offVariation !== undefined) {
        updated.offVariation = offVariation;
      }

      if (fallthrough) {
        updated.fallthrough = fallthrough;
      }

      if (archived !== undefined) {
        updated.archived = archived;
      }

      await flagModel.findOneAndUpdate(
        {
          key,
          workspace: workspaceId,
        },
        updated
      );
    } else {
      const {
        variationsJson,
        variationsBoolean,
        variationsNumber,
        variationsString,
      } = detail;
      const variations =
        variationsBoolean ||
        variationsJson?.map((value) => JSON.parse(value)) ||
        variationsNumber ||
        variationsString;

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
        variations,
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
