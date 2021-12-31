import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Project } from "@/model/project-model";
import { ApiTokensDoc } from "@/shared/api-tokens/api-tokens-model";

export class Environment extends TimeStamps {
  @prop({ default: () => new mongoose.Types.ObjectId() })
  _id?: mongoose.Types.ObjectId;

  @prop({ ref: Project, required: true })
  project?: Ref<Project>;

  @prop({ ref: ApiTokensDoc, required: true })
  apiToken?: Ref<ApiTokensDoc>;

  @prop()
  name: string;
}

export const EnvironmentModel = getModelForClass(Environment);
