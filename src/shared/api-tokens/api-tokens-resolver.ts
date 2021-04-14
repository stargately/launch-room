import {
  Args,
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

@ObjectType()
class ApiTokens {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  launchRoomToken?: string;
}

@ArgsType()
class UpsertTokensRequest {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  launchRoomToken: string;
}

@Resolver()
export class ApiTokensResolver {
  @Authorized()
  @Query(() => ApiTokens)
  public async apiTokens(@Ctx() ctx: IContext): Promise<ApiTokens> {
    const userWorkspace = await ctx.model.userWorkspace.findOne({
      user: ctx.userId,
    });

    const tokens = await ctx.model.apiTokens.findOne({
      workspace: userWorkspace?.workspace,
    });

    return (
      tokens ||
      ctx.model.apiTokens.create({ workspace: userWorkspace?.workspace })
    );
  }

  @Authorized()
  @Mutation(() => ApiTokens, { nullable: true })
  async upsertApiTokens(
    @Args() args: UpsertTokensRequest,
    @Ctx() ctx: IContext
  ): Promise<ApiTokens | null> {
    return ctx.model.apiTokens.findOneAndUpdate({ _id: args._id }, { ...args });
  }
}
