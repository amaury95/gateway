import { NextFunction, Request, Response } from "express";
import PeripheralModel, { Peripheral } from "../models/peripheral";
import { DocumentType } from "@typegoose/typegoose";

// GET /peripherals
export async function index(req: Request, res: Response) {
  await PeripheralModel.find().exec((err, items) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json(items);
    }
  });
}

// GET /peripherals/1
export async function show(req: Request, res: Response) {
  // @ts-ignore
  res.json(req.peripheral);
}

// POST /peripherals
export async function create(req: Request, res: Response) {
  const model = new PeripheralModel(req.body);

  await model.save((err, item) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      res.status(201).json(item);
    }
  });
}

// PATCH /peripherals/1
export async function update(req: Request, res: Response) {
  // @ts-ignore
  const peripheral = req.peripheral as DocumentType<Peripheral>;

  const model = {
    gatewayId: req.body.gatewayId || peripheral.gatewayId,
    vendor: req.body.vendor || peripheral.vendor,
    uid: req.body.uid || peripheral.uid,
  };

  await peripheral.overwrite(model).save((err, item) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      res.status(205).json(item);
    }
  });
}

// DELETE /peripherals/1
export async function destroy(req: Request, res: Response) {
  // @ts-ignore
  const peripheral = req.peripheral as DocumentType<Peripheral>;

  await peripheral.remove((err, item) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      // Remove gateway peripherals
      res.json(item);
    }
  });
}

// MIDDLEWARES
export async function set_peripheral(req: Request, res: Response, next: NextFunction) {
  await PeripheralModel.findOne({ _id: req.params.id }).exec((err, item) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (item === null) {
      res.status(404).send({ error: "peripheral not found" });
    } else {
      // @ts-ignore
      req.peripheral = item;
      next();
    }
  });
}
