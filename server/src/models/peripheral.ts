import { getModelForClass, prop } from "@typegoose/typegoose";

export class Peripheral {
  @prop({ unique: true })
  public uid: number;

  @prop()
  public vendor: string;

  @prop({ immutable: true, default: Date.now })
  public created: Date;

  @prop({ required: true })
  public gatewayId: string;
}

export default getModelForClass(Peripheral);
