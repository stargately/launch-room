import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Workspace } from "@/model/workspace-model";

@index({ key: 1, workspace: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Flag extends TimeStamps {
  @prop()
  key: string;

  @prop({ ref: Workspace })
  workspace: Ref<Workspace>;

  @prop({ default: 1 })
  version?: number;

  // this should be on; however, mongoose does not allow it for
  // throw new Error('`' + firstPieceOfPath + '` may not be used as a schema pathname');
  @prop({ default: true })
  isOn: boolean;

  @prop({ default: true })
  trackEvents?: boolean;

  @prop({ default: true })
  trackEventsFallthrough?: boolean;

  @prop({ default: false })
  deleted?: boolean;

  @prop({ default: [] })
  prerequisites?: Array<{
    key: string;
    variation: number;
  }>;

  @prop()
  salt: string;

  @prop()
  sel: string;

  @prop({ default: [] })
  targets?: Array<{
    values: Array<string>;
    variation: number;
  }>;

  @prop()
  rules?: Array<{
    id?: string;
    variation: number;
    clauses: Array<{
      attribute: string;
      op: string;
      values: Array<string>;
      negate: boolean;
    }>;
    trackEvents: boolean;
  }>;

  @prop()
  fallthrough: { variation: number };

  @prop({ default: 0 })
  offVariation?: number;

  @prop()
  variations: Array<boolean>;

  @prop({ default: null })
  debugEventsUntilDate?: any;

  @prop({ default: true })
  clientSide?: boolean;

  @prop()
  clientSideAvailability: {
    usingMobileKey: boolean;
    usingEnvironmentId: boolean;
  };

  @prop()
  name?: string;

  @prop()
  description?: string;
}

export const FlagModel = getModelForClass(Flag);
