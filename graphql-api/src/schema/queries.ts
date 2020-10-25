import { GraphQLID, GraphQLList, GraphQLObjectType } from "graphql";
import axios from "axios";

import { GatewayType, Gateway } from "../types/gateway";
import { PeripheralType, Peripheral } from "../types/peripheral";

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    // GET GATEWAYS
    getGateways: {
      type: GraphQLList(GatewayType),
      resolve: async (_source, _args, { dataSources }) => dataSources.gatewaysAPI.getGateways(),
    },

    // FETCH GATEWAY
    getGateway: {
      type: GatewayType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_source, { id }, { dataSources }) => dataSources.gatewaysAPI.fetchGateway(id),
    },

    // GET PERIPHERALS
    getPeripherals: {
      type: GraphQLList(PeripheralType),
      resolve: async (_source, _args, { dataSources }) => dataSources.peripheralsAPI.getPeripherals(),
    },

    // FETCH PERIPHERAL
    getPeripheral: {
      type: PeripheralType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_source, { id }, { dataSources }) => dataSources.peripheralsAPI.fetchPeripheral(id),
    },
  },
});
