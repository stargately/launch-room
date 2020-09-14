import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TUser } from "onefx-auth/lib/model/user-model";

export class Workspace extends TimeStamps {
  @prop()
  name: string;

  @prop({ ref: "User" })
  owner: Ref<TUser>;
}

export const WorkspaceModel = getModelForClass(Workspace);
