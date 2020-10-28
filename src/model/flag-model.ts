import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@index({ key: 1 }, { unique: true })
export class Flag extends TimeStamps {
  @prop()
  key: string;

  @prop()
  version: number;

  @prop()
  isOn: boolean;

  get on() {
    return () => {
      return this.isOn;
    };
  }

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
