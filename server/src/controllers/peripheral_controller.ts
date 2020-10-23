import { NextFunction, Request, Response } from "express";
import { Peripheral, PeripheralModel } from "../models/peripheral";

// GET /peripherals
export async function index(req: Request, res: Response) {
  try {
    const result = await PeripheralModel.find();
    res.send(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// GET /peripherals/1
export async function show(req: Request, res: Response) {
  // @ts-ignore
  const peripheral: Peripheral = req.peripheral;

  res.send(peripheral);
}

// POST /peripherals
export async function create(req: Request, res: Response) {
  const model = new PeripheralModel(req.body as Peripheral);
  try {
    await model.save();
    res.status(201).send(model);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// PUT /peripherals/1
export async function update(req: Request, res: Response) {
  // @ts-ignore
  const peripheral: Peripheral = req.peripheral;

  const data = "host";
  res.send({ data });
}

// DELETE /peripherals/1
export async function destroy(req: Request, res: Response) {
  // @ts-ignore
  const peripheral: Peripheral = req.peripheral;

  const data = "host";
  res.send({ data });
}

// MIDDLEWARES
export async function set_peripheral(req: Request, res: Response, next: NextFunction) {
  const peripheral = new Peripheral();
  peripheral.vendor = "fake name";

  // @ts-ignore
  req.peripheral = peripheral;
  next();
}
