import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import axios from "axios";
import { Gateway, GatewayType } from "../types/gateway";
import { Peripheral, PeripheralStatusType, PeripheralType } from "../types/peripheral";

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
      resolve: async (_source, args: Gateway, { dataSources }) => dataSources.gatewaysAPI.createGateway(args),
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
      resolve: async (_source, args: Peripheral, { dataSources }) => dataSources.peripheralsAPI.createPeripheral(args),
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
