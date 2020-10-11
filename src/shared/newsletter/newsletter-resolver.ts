import {
  Args,
  Ctx,
  ArgsType,
  Field,
  Resolver,
  ObjectType,
  Mutation,
} from "type-graphql";
import { Recipient, SendgridClient } from "@/shared/newsletter/sendgrid-client";

@ArgsType()
export class ArticlesRequest implements Recipient {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;
}

interface Opts {
  gateways: {
    sendgridClient: SendgridClient;
  };
}

@ObjectType()
class Empty {
  @Field(() => Boolean)
  public ok: boolean;
}

@Resolver()
export class NewsletterResolver {
  @Mutation(() => Empty)
  public async subscribeToNewsletter(
    @Args()
    args: ArticlesRequest,
    @Ctx()
    ctx: Opts
  ): Promise<{ ok: boolean }> {
    await ctx.gateways.sendgridClient.addToList(args);
    return { ok: true };
  }
}
