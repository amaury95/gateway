import request from "supertest";
import app from "../../server";
import mongoose from "mongoose";
import { dbaddr } from "../../setup";
import GatewayModel, { Gateway } from "../../models/gateway";
import PeripheralModel from "../../models/peripheral";
import { range } from "lodash";
import faker from "faker";

mongoose.connect(dbaddr("integration-test"), { useNewUrlParser: true });

describe("Gateway controller integration testing", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("test gateway endpoints", () => {
    it("should retrieve a list of gateways", async () => {
      const size = 1;

      await Promise.all(
        range(size).map(async (i) => {
          await GatewayModel.create({
            address: "10.0.2.2",
            serial: faker.name.firstName(),
            name: "gateway",
          });
        })
      );

      request(app)
        .get("/api/gateways")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(size);
        });
    });

    it("should retrieve a gateway", async () => {
      const model = await GatewayModel.create({
        address: "10.0.2.2",
        serial: faker.name.firstName(),
        name: "gateway",
      });

      request(app)
        .get(`/api/gateways/${model.id}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.address).toEqual(model.address);
          expect(res.body.serial).toEqual(model.serial);
          expect(res.body.name).toEqual(model.name);
        });
    });

    it("should create and return a gateway", async () => {
      const data: Gateway = {
        address: "10.0.2.2",
        serial: faker.name.firstName(),
        name: "gateway",
      };

      request(app)
        .post("/api/gateways")
        .send(data)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.address).toEqual(data.address);
          expect(res.body.serial).toEqual(data.serial);
          expect(res.body.name).toEqual(data.name);
        });
    });

    it("should update a gateway", async () => {
      const model = await GatewayModel.create({
        address: "10.0.2.2",
        serial: faker.name.firstName(),
        name: "gateway",
      });

      const data: Gateway = {
        address: "10.0.2.3",
        serial: faker.name.firstName(),
        name: "this is the name",
      };

      request(app)
        .patch(`/api/gateways/${model.id}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(205)
        .end((err, res) => {
          // expect(err).toBeNull();
          // expect(res.body.address).toEqual(data.address);
          // expect(res.body.serial).toEqual(data.serial);
          // expect(res.body.name).toEqual(model.name);
        });
    });

    it("should delete a gateway", async () => {
      const model = await GatewayModel.create({
        address: "10.0.2.2",
        serial: faker.name.firstName(),
        name: "gateway",
      });

      request(app)
        .delete(`/api/gateways/${model.id}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
        });
    });

    it("should retrieve gateway relations", async () => {
      const size = 10;

      const model = await GatewayModel.create({
        address: "10.0.2.2",
        serial: faker.name.firstName(),
        name: "gateway",
      });

      await Promise.all(
        range(size).map(async (i) => {
          await PeripheralModel.create({
            vendor: "vendor" + i,
            gatewayId: model.id,
            uid: i,
            created: Date.now(),
          });
        })
      );

      request(app)
        .delete(`/api/gateways/${model.id}/peripherals`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.length).toBe(size);
        });
    });
  });
});
