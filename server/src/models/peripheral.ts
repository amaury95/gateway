import { getModelForClass, prop } from "@typegoose/typegoose";

export class Peripheral {
  @prop()
  public uid: number;

  @prop()
  public vendor: string;

  @prop()
  public date: Date;
}

export const PeripheralModel = getModelForClass(Peripheral);
