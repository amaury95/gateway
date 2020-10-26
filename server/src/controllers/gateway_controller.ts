import { NextFunction, Request, Response } from "express";
import GatewayModel, { Gateway } from "../models/gateway";
import { DocumentType } from "@typegoose/typegoose";

// GET /gateways
export async function index(req: Request, res: Response) {
  await GatewayModel.find().exec((err, items) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(items);
    }
  });
}

// GET /gateways/1
export async function show(req: Request, res: Response) {
  // @ts-ignore
  res.json(req.gateway);
}

// POST /gateways
export async function create(req: Request, res: Response) {
  const model = new GatewayModel(req.body);

  await model.save((err, item) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(item);
    }
  });
}

// PATCH /gateways/1
export async function update(req: Request, res: Response) {
  // @ts-ignore
  const gateway = req.gateway as DocumentType<Gateway>;

  // Filtering parameters so cant be overriden _id or unwanted fields.
  const { address, serial, name } = req.body as Gateway;

  // Replace parameters in the actual model.
  gateway.overwrite({ address, serial, name });

  await gateway.save((err, item) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(205).json(item);
    }
  });
}

// DELETE /gateways/1
export async function destroy(req: Request, res: Response) {
  // @ts-ignore
  const gateway = req.gateway as DocumentType<Gateway>;

  await gateway.remove((err, item) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Remove gateway peripherals
      res.json(item);
    }
  });
}

// GET /gateways/1/peripherals
export async function peripherals(req: Request, res: Response) {
  // @ts-ignore
  const gateway = req.gateway as DocumentType<Gateway>;

  gateway.populate("peripherals", (err, item) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(item.peripherals);
    }
  });
}

// MIDDLEWARES
export async function set_gateway(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await GatewayModel.findOne({ _id: req.params.id }).exec((err, item) => {
    if (err) {
      res.status(500).send(err);
    } else if (item === null) {
      res.status(404).send({ error: "gateway not found" });
    } else {
      // @ts-ignore
      req.gateway = item;
      next();
    }
  });
}
