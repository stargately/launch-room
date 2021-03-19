import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TUser as User } from "onefx-auth/lib/model/user-model";
import { Workspace } from "@/model/workspace-model";

// eslint-disable-next-line no-shadow
export enum WorkspaceRole {
  admin = "admin",
  follower = "follower",
  inactive = "inactive",
}

@modelOptions({ options: { customName: "user_workspace" } })
export class UserWorkspace extends TimeStamps {
  @prop({ ref: "User" })
  user: Ref<User>;

  @prop({ ref: Workspace })
  workspace: Ref<Workspace>;

  @prop({ enum: WorkspaceRole })
  role: WorkspaceRole;
}

export const UserWorkspaceModel = getModelForClass(UserWorkspace);
