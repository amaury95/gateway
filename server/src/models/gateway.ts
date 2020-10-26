import { getModelForClass, Ref, prop } from "@typegoose/typegoose";

import { Peripheral } from "./peripheral";

const ipAddrExp: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export class Gateway {
  @prop({ required: true, unique: true, minlength: 6 })
  public serial!: string;

  @prop({ minlength: 3, maxlength: 16 })
  public name?: string;

  @prop({ required: true, match: ipAddrExp })
  public address!: string;

  @prop({
    ref: () => Peripheral,
    localField: "_id",
    foreignField: "gatewayId",
    maxlength: 10,
  })
  public peripherals?: Ref<Peripheral>[];
}

export default getModelForClass(Gateway);
