import request from "supertest";
import app from "../../server";
import mongoose from "mongoose";
import { dbaddr } from "../../setup";
import GatewayModel, { Gateway } from "../../models/gateway";
import PeripheralModel from "../../models/peripheral";
import { range } from "lodash";

mongoose.connect(dbaddr("integration-test"), { useNewUrlParser: true });

describe("Peripheral controller integration testing", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("test peripheral endpoints", () => {
    it("should list all peripherals", async () => {
      const size = 10;

      const model = await GatewayModel.create({
        address: "10.0.2.2",
        serial: "serial",
        name: "gateway",
      });

      await Promise.all(
        range(size).map(async (i) => {
          await PeripheralModel.create({
            created: Date.now(),
            gatewayId: model.id,
            uid: i,
            vendor: "vendor",
          });
        })
      );

      request(app)
        .get("/api/peripherals")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toEqual(size);
        });
    });

    // it("should retrieve a peripherals", async () => {});

    // it("should create a  peripherals", async () => {});

    // it("should update a peripherals", async () => {});

    // it("should destroy a peripherals", async () => {});
  });
});
