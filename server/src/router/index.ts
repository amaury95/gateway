import { Router } from "express";
import { GatewayController, PeripheralController } from "../controllers";

const router = Router();

// GATEWAYS ROUTES
router.get("/gateways", GatewayController.index);
router.get("/gateways/:id", GatewayController.set_gateway, GatewayController.show);
router.post("/gateways", GatewayController.create);
router.patch("/gateways/:id", GatewayController.set_gateway, GatewayController.update);
router.delete("/gateways/:id", GatewayController.set_gateway, GatewayController.destroy);

router.get("/gateways/:id/peripherals", GatewayController.set_gateway, GatewayController.peripherals);

// PERIPHERAL ROUTES
router.get("/peripherals", PeripheralController.index);
router.get("/peripherals/:id", PeripheralController.set_peripheral, PeripheralController.show);
router.post("/peripherals", PeripheralController.create);
router.patch("/peripherals/:id", PeripheralController.set_peripheral, PeripheralController.update);
router.delete("/peripherals/:id", PeripheralController.set_peripheral, PeripheralController.destroy);

export default router;
