import { NextFunction, Request, Response } from "express";
import { Gateway, GatewayModel } from "../models/gateway";

// GET /gateways
export async function index(req: Request, res: Response) {
  try {
    const gateways = await GatewayModel.find();
    res.send(gateways);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// GET /gateways/1
export async function show(req: Request, res: Response) {
  // @ts-ignore
  const gateway: Gateway = req.gateway;

  res.send(gateway);
}

// POST /gateways
export async function create(req: Request, res: Response) {
  const model = new GatewayModel(req.body as Gateway);
  try {
    await model.save();
    res.status(201).send(model);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// PUT /gateways/1
export async function update(req: Request, res: Response) {
  // @ts-ignore
  const gateway: Gateway = req.gateway;

  const data = "host";
  res.send({ data });
}

// DELETE /gateways/1
export async function destroy(req: Request, res: Response) {
  // @ts-ignore
  const gateway: Gateway = req.gateway;

  const data = "host";
  res.send({ data });
}

// MIDDLEWARES
export async function set_gateway(req: Request, res: Response, next: NextFunction) {
  const gateway = new Gateway();
  gateway.name = "fake name";

  // @ts-ignore
  req.gateway = gateway;
  next();
}
