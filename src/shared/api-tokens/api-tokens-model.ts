import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import nanoid58 from "nanoid-base58";
import { Workspace } from "@/model/workspace-model";

@modelOptions({ options: { customName: "api_tokens" } })
export class ApiTokensDoc extends TimeStamps {
  @prop({ default: () => new mongoose.Types.ObjectId() })
  _id?: mongoose.Types.ObjectId;

  @prop({ ref: Workspace, required: true })
  workspace?: Ref<Workspace>;

  @prop({ default: () => `launch_room_${nanoid58()}` })
  launchRoomToken?: string;
}

export const ApiTokensModel = getModelForClass(ApiTokensDoc);
