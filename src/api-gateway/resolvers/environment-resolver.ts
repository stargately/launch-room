import {
  Args,
  ID,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { IContext } from "@/api-gateway/api-gateway";
import { Environment as EnvironmentDoc } from "@/model/environment-model";

@ObjectType()
class Environment {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  project: string;

  @Field(() => ID)
  apiToken: string;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

@ArgsType()
class UpsertEnvironmentRequest {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID, { nullable: true })
  project?: string;

  @Field(() => String, { nullable: true })
  launchRoomToken?: string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

@ArgsType()
class RequestByWorkspaceId {
  @Field(() => ID)
  workspace: string;
}

@Resolver()
export class EnvironmentsResolver {
  @Authorized()
  @Query(() => [Environment])
  public async fetchEnvironments(
    @Args() { workspace }: RequestByWorkspaceId,
    @Ctx() { model: { environmentModel, projectModel } }: IContext
  ): Promise<EnvironmentDoc[]> {
    const projects = await projectModel.find({ workspace, deletedAt: null });
    const environments = await Promise.all(
      projects.map(
        async (project): Promise<EnvironmentDoc[]> =>
          environmentModel.find({
            project: project._id,
            deletedAt: null,
          })
      )
    );
    return environments.flat();
  }

  @Authorized()
  @Mutation(() => Environment, { nullable: true })
  async upsertEnvironment(
    @Args() { _id, name, project, deletedAt }: UpsertEnvironmentRequest,
    @Ctx() { model: { environmentModel, projectModel, apiTokens } }: IContext
  ): Promise<EnvironmentDoc | null> {
    if (_id) {
      return environmentModel.findOneAndUpdate(
        { _id },
        { name, project, deletedAt }
      );
    }
    const workspace = await projectModel.findOne({ _id: project });
    const apiToken = await apiTokens.create({
      workspace: workspace?.workspace,
    });

    return environmentModel.create({ name, project, apiToken });
  }
}
