import { DocumentType, getModelForClass, pre, prop } from "@typegoose/typegoose";
import { Error } from "mongoose";
import GatewayModel from "./gateway";

export enum PeripheralStatus {
  offline,
  online,
}

@pre<Peripheral>("validate", async function (next) {
  const err = await this.validateParentLimit();
  if (err) next(err);
  // setup more validators
  else next();
})
export class Peripheral {
  @prop({ unique: true })
  public uid: number;

  @prop()
  public vendor?: string;

  @prop({ immutable: true, default: Date.now })
  public created?: Date;

  @prop({ default: PeripheralStatus.offline })
  public status?: PeripheralStatus;

  @prop({ required: true })
  public gatewayId: string;

  public async validateParentLimit(this: DocumentType<Peripheral>): Promise<Error> {
    try {
      const parent = await GatewayModel.findById(this.gatewayId).populate("peripherals");
      if (parent.peripherals.length >= 10) {
        return {
          name: "validation error",
          message: "gateway limit of peripherals is reached",
        };
      }
    } catch (e) {
      return {
        name: "input error",
        message: "gateway not found",
      };
    }
  }
}

export default getModelForClass(Peripheral);
