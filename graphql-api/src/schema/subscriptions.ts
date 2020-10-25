import { PubSub } from "apollo-server";
import { GraphQLID, GraphQLObjectType } from "graphql";
import { PeripheralType } from "../types/peripheral";
import { GatewayType } from "../types/gateway";

export const pubsub = new PubSub();

// Global subscription channel.
export const GATEWAY_CREATED = "GATEWAY_CREATED";

// Partial subscription channel.
export const PERIPHERAL_CREATED = (id: string) => `PERIPHERAL_CREATED_${id}`;

export default new GraphQLObjectType({
  name: "Subscription",
  fields: {
    /**
     * Example of global subscription: everyone could when a gateway is created
     */
    gatewayCreated: {
      type: GatewayType,
      subscribe: () => pubsub.asyncIterator([GATEWAY_CREATED]),
    },
    /**
     * Example of partial subscription: only people subscribed to the specific gateway id will be able to watch when
     * a peripherical is added. This avoid network overload.
     */
    peripheralCreated: {
      type: PeripheralType,
      args: {
        id: { type: GraphQLID },
      },
      subscribe: (_source, { id }) => pubsub.asyncIterator([PERIPHERAL_CREATED(id)]),
    },
  },
});
