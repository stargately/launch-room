import {
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { IContext } from "@/api-gateway/api-gateway";
import { ApiTokensDoc } from "@/shared/api-tokens/api-tokens-model";

@ObjectType()
class ApiTokens {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  launchRoomToken?: string;
}

@ArgsType()
class UpsertTokensRequest {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  launchRoomToken: string;
}

@ArgsType()
class RequestByApiTokenId {
  @Field(() => ID)
  _id: string;
}

@Resolver()
export class ApiTokensResolver {
  @Authorized()
  @Query(() => ApiTokens)
  public async fetchApiTokens(
    @Args() { _id }: RequestByApiTokenId,
    @Ctx() { model: { apiTokens } }: IContext
  ): Promise<ApiTokensDoc | null> {
    return apiTokens.findById(_id);
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
