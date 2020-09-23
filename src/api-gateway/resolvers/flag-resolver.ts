import { ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class FlagStatus {}

@ObjectType()
class FlagsStatus {
  total: number;

  skip: number;

  limit: number;

  flags: Array<FlagStatus>;
}

@Resolver()
export class FlagResolver {
  @Query(() => FlagsStatus)
  public async flagsStatus(): Promise<string> {
    return "OK";
  }
}
