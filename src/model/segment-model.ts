import { getModelForClass, prop, index } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@index({ key: 1 }, { unique: true })
export class Segment extends TimeStamps {
  @prop()
  key: string;

  @prop()
  included: Array<any>;

  @prop()
  excluded: Array<any>;

  @prop()
  salt: string;

  @prop()
  rules: Array<{
    id: string;
    clauses: Array<{
      attribute: string;
      op: string;
      values: Array<string | boolean>;
      negate: boolean;
    }>;
  }>;

  @prop()
  version: number;

  @prop()
  deleted: boolean;
}

export const SegmentModel = getModelForClass(Segment);
