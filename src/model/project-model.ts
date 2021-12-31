import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Workspace } from "@/model/workspace-model";

export class Project extends TimeStamps {
  @prop({ default: () => new mongoose.Types.ObjectId() })
  _id?: mongoose.Types.ObjectId;

  @prop({ ref: Workspace })
  workspace: Ref<Workspace>;

  @prop()
  name: string;

  @prop()
  deletedAt?: Date;
}

export const ProjectModel = getModelForClass(Project);
