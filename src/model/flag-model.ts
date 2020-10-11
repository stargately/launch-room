import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Flag extends TimeStamps {
  @prop()
  namespace?: string;

  @prop()
  key?: string;

  @prop()
  version: number;

  @prop()
  isOn: boolean;

  get on(): boolean {
    return this.isOn;
  }

  @prop()
  deleted: boolean;

  @prop()
  fallthrough: {
    variation: number;
  };

  @prop()
  offVariation: number;
}

export const FlagModel = getModelForClass(Flag);
