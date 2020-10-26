import { getModelForClass, prop } from "@typegoose/typegoose";

export class Peripheral {
  @prop({ unique: true })
  public uid: number;

  @prop()
  public vendor: string;

  @prop({ immutable: true })
  public created: Date;

  @prop()
  public gatewayId: string;
}

export default getModelForClass(Peripheral);
