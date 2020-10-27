import mongoose from "mongoose";
import { dbaddr } from "../../setup";
import GatewayModel from "../../models/gateway";
import PeripheralModel, { Peripheral } from "../../models/peripheral";

mongoose.connect(dbaddr("unit-test"), { useNewUrlParser: true });

describe("Peripheral model test", () => {
  beforeAll(async () => {
    await PeripheralModel.remove({});
    await GatewayModel.remove({});
  });

  afterEach(async () => {
    await PeripheralModel.remove({});
    await GatewayModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("peripheral validations", () => {
    it("should create a valid peripheral", async () => {
      const parent = await GatewayModel.create({
        address: "10.0.1.1",
        serial: "123456",
      });

      const record = await PeripheralModel.create({
        gatewayId: parent.id,
        uid: 1,
        vendor: "vendor",
        created: Date.now(),
      });

      expect(record).toBeDefined();
    });

    it("should fail creating a peripheral with duplicated uid", async () => {
      const parent = await GatewayModel.create({
        address: "10.0.1.1",
        serial: "123456",
      });

      await PeripheralModel.create({
        gatewayId: parent.id,
        uid: 1,
        vendor: "vendor",
        created: Date.now(),
      });

      try {
        const record = await PeripheralModel.create({
          gatewayId: parent.id,
          uid: 1,
          vendor: "vendor",
          created: Date.now(),
        });
        expect(record).toBeUndefined();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
