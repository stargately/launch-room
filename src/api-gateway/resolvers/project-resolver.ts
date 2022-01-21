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
import { Project as ProjectDoc } from "@/model/project-model";

@ObjectType()
class Project {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  workspace: string;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

@ArgsType()
class UpsertProjectRequest {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  workspace: string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

@ArgsType()
class RequestByWorkspaceId {
  @Field(() => ID)
  workspace: string;
}

@Resolver()
export class ProjectsResolver {
  @Authorized()
  @Query(() => [Project])
  public async fetchProjects(
    @Args() { workspace }: RequestByWorkspaceId,
    @Ctx() { model: { projectModel } }: IContext
  ): Promise<ProjectDoc[]> {
    return projectModel.find({ workspace, deletedAt: null });
  }

  @Authorized()
  @Mutation(() => Project, { nullable: true })
  async upsertProject(
    @Args() { _id, name, workspace, deletedAt }: UpsertProjectRequest,
    @Ctx() { model: { projectModel } }: IContext
  ): Promise<ProjectDoc | null> {
    if (_id) {
      return projectModel.findOneAndUpdate(
        { _id },
        { name, workspace, deletedAt }
      );
    }
    return projectModel.create({ name, workspace });
  }
}
