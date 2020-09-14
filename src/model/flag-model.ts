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

  @prop()
  version: number;

  // this should be on; however, mongoose does not allow it for
  // throw new Error('`' + firstPieceOfPath + '` may not be used as a schema pathname');
  @prop()
  isOn: boolean;

  @prop()
  trackEvents: boolean;

  @prop()
  trackEventsFallthrough: boolean;

  @prop()
  deleted: boolean;

  @prop()
  prerequisites: Array<{
    key: string;
    variation: number;
  }>;

  @prop()
  salt: string;

  @prop()
  sel: string;

  @prop()
  targets: Array<{
    values: Array<string>;
    variation: number;
  }>;

  @prop()
  rules: Array<{
    id: string;
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

  @prop()
  offVariation: number;

  @prop()
  variations: Array<boolean>;

  @prop()
  debugEventsUntilDate: any;

  @prop()
  clientSide: boolean;

  @prop()
  clientSideAvailability: {
    usingMobileKey: boolean;
    usingEnvironmentId: boolean;
  };
}

export const FlagModel = getModelForClass(Flag);
