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
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  sendgridApiKey?: string;

  @Field(() => String, { nullable: true })
  carrierToken?: string;

  @Field(() => String, { nullable: true })
  logoUrl?: string;
}

@ArgsType()
class UpsertTokensRequest {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  sendgridApiKey?: string;

  @Field(() => String, { nullable: true })
  carrierToken?: string;
}

@Resolver()
export class ApiTokensResolver {
  @Authorized()
  @Query(() => ApiTokens)
  public async apiTokens(@Ctx() ctx: IContext): Promise<ApiTokens> {
    const tokens = await ctx.model.apiTokens.findOne({ owner: ctx.userId });
    if (tokens) {
      return tokens;
    }
    // TODO(tian): add workspace
    return ctx.model.apiTokens.create();
  }

  @Authorized()
  @Mutation(() => ApiTokens, { nullable: true })
  async upsertApiTokens(
    @Args() args: UpsertTokensRequest,
    @Ctx() ctx: IContext
  ): Promise<ApiTokens | null> {
    return ctx.model.apiTokens.findOneAndUpdate(
      { _id: args._id, owner: ctx.userId },
      { ...args, owner: ctx.userId }
    );
  }
}
