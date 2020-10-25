import { PubSub } from "apollo-server";
import { GraphQLObjectType } from "graphql";
import { PeripheralType } from "../types/peripheral";
import { GatewayType } from "../types/gateway";

export const pubsub = new PubSub();

export const GATEWAY_CREATED = "GATEWAY_CREATED";
export const PERIPHERAL_CREATED = "PERIPHERAL_CREATED";

export default new GraphQLObjectType({
  name: "Subscription",
  fields: {
    gatewayCreated: {
      type: GatewayType,
      subscribe: () => pubsub.asyncIterator([GATEWAY_CREATED]),
    },
    peripheralCreated: {
      type: PeripheralType,
      subscribe: () => pubsub.asyncIterator([PERIPHERAL_CREATED]),
    },
  },
});
