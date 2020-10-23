import { Router } from "express";
import { GatewayController, PeripheralController } from "../controllers";

const router = Router();

// GATEWAYS ROUTES
router.route("/gateways").get(GatewayController.index).post(GatewayController.create);

router
  .route("/gateways/:gateway_id")
  .get(GatewayController.set_gateway, GatewayController.show)
  .put(GatewayController.set_gateway, GatewayController.update)
  .delete(GatewayController.set_gateway, GatewayController.destroy);

// PERIPHERAL ROUTES
router
  .route("gateways/:gateway_id/pheripherals")
  .get(GatewayController.set_gateway, PeripheralController.index)
  .post(GatewayController.set_gateway, PeripheralController.create);

router
  .route("gateways/:gateway_id/pheripherals/:pheripheral_id")
  .get(GatewayController.set_gateway, PeripheralController.set_peripheral, PeripheralController.show)
  .put(GatewayController.set_gateway, PeripheralController.set_peripheral, PeripheralController.update)
  .delete(GatewayController.set_gateway, PeripheralController.set_peripheral, PeripheralController.destroy);

export default router;
