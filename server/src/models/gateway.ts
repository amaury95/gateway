import { getModelForClass, Ref, prop } from "@typegoose/typegoose";

import { Peripheral } from "./peripheral";

const ipAddrExp: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export class Gateway {
  @prop({ unique: true, minlength: 6 })
  public serialNo?: string;

  @prop({ minlength: 3, maxlength: 16 })
  public name?: string;

  @prop({ required: true, match: ipAddrExp })
  public ipAddr!: string;

  @prop({ ref: () => Peripheral, foreignField: "gateway", localField: "_id" })
  public peropherals: Ref<Peripheral>[];
}

export default getModelForClass(Gateway);
