import { getModelForClass, Ref, prop } from "@typegoose/typegoose";

export class Peripheral {
  @prop({ unique: true })
  public uid: number;

  @prop()
  public vendor: string;

  @prop()
  public date: Date;

  @prop()
  public gatewayId: string;
}

export default getModelForClass(Peripheral);
