import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Gateway, GatewayType } from "../types/gateway";
import { Peripheral, PeripheralStatusType, PeripheralType } from "../types/peripheral";
import { GATEWAY_CREATED, PERIPHERAL_CREATED, pubsub } from "./subscriptions";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // CREATE GATEWAY
    createGateway: {
      type: GatewayType,
      args: {
        serial: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve: async (_source, args: Gateway, { dataSources }) => {
        const data = dataSources.gatewaysAPI.createGateway(args);
        pubsub.publish(GATEWAY_CREATED, { gatewayCreated: data });
        return data;
      },
    },

    // UPDATE GATEWAY
    updateGateway: {
      type: GatewayType,
      args: {
        id: { type: GraphQLID },
        serial: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve: async (_source, { id, ...args }, { dataSources }) => dataSources.gatewaysAPI.updateGateway(id, args),
    },

    // DELETE GATEWAY
    deleteGateway: {
      type: GatewayType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_source, { id }, { dataSources }) => dataSources.gatewaysAPI.destroyGateway(id),
    },

    // CREATE PERIPHERAL
    createPeripheral: {
      type: PeripheralType,
      args: {
        uid: { type: GraphQLInt },
        gatewayId: { type: GraphQLString },
        vendor: { type: GraphQLString },
        created: { type: GraphQLString },
        status: { type: PeripheralStatusType },
      },
      resolve: async (_source, args: Peripheral, { dataSources }) => {
        const data = dataSources.peripheralsAPI.createPeripheral(args);
        pubsub.publish(PERIPHERAL_CREATED, { peripheralCreated: data });
        return data;
      },
    },

    // UPDATE PERIPHERAL
    updatePeripheral: {
      type: PeripheralType,
      args: {
        id: { type: GraphQLID },
        uid: { type: GraphQLInt },
        gatewayId: { type: GraphQLString },
        vendor: { type: GraphQLString },
        created: { type: GraphQLString },
        status: { type: PeripheralStatusType },
      },
      resolve: async (_source, { id, ...args }, { dataSources }) =>
        dataSources.peripheralsAPI.updatePeripheral(id, args),
    },

    // DELETE PERIPHERAL
    deletePeripheral: {
      type: PeripheralType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_source, { id }, { dataSources }) => dataSources.peripheralsAPI.destroyPeripheral(id),
    },
  },
});
