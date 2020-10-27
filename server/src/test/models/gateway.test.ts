import mongoose from "mongoose";
import { range } from "lodash";
import { dbaddr } from "../../setup";
import GatewayModel, { Gateway } from "../../models/gateway";
import PeripheralModel from "../../models/peripheral";

mongoose.connect(dbaddr("unit-test"), { useNewUrlParser: true });

describe("Gateway model test", () => {
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

  describe("gateway validations", () => {
    it("should create a valid gateway", async () => {
      const model: Gateway = {
        address: "10.0.2.2",
        serial: "serialNo1",
        name: "gateway1",
      };

      const record = await GatewayModel.create(model);

      expect(model.address).toEqual(record.address);
      expect(model.serial).toEqual(record.serial);
      expect(model.name).toEqual(record.name);
    });

    it("should fail creating a gataway with duplicated serial number", async () => {
      const model1: Gateway = {
        address: "10.0.2.2",
        serial: "serialNo1",
        name: "gateway1",
      };

      await GatewayModel.create(model1);

      const model2: Gateway = {
        address: "10.0.2.3",
        serial: "serialNo1",
        name: "gateway2",
      };

      try {
        const record = await GatewayModel.create(model2);
        expect(record).toBeUndefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });

    it("should fail creating gateways with invalid ip addresses", async () => {
      const addresses = ["invalid", "10.0.2.a", "10.0.1.", "10.0.1", "10.0.256.0"];

      await Promise.all(
        addresses.map(async (address) => {
          await GatewayModel.create(
            {
              serial: "serialNo1",
              name: "gateway2",
              address,
            },
            (err, item) => {
              expect(item).toBeUndefined();
              expect(err).toBeDefined();
            }
          );
        })
      );
    });
  });

  describe("gateway relations validations", () => {
    it("should fail creating more than ten peripheral for one gateway", async () => {
      const model = await GatewayModel.create({
        address: "10.0.1.1",
        serial: "123456",
      });

      await Promise.all(
        range(12).map(async (i) => {
          try {
            const item = await PeripheralModel.create({
              uid: i,
              gatewayId: model.id,
              created: Date.now(),
              vendor: "vendor",
            });

            if (i < 10) expect(item).toBeDefined();
            else expect(item).not.toBeDefined();
          } catch (err) {
            if (i < 10) expect(err).toBeNull();
            else expect(err).not.toBeNull();
          }
        })
      );
      //
    });
  });
});
