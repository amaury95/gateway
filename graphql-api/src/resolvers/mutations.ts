import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import axios from "axios";
import { Gateway, GatewayType } from "../types/gateway";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createGateway: {
      type: GatewayType,
      args: {
        serial: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve: async (source: void, args: Gateway): Promise<Gateway> => {
        const resp = await axios.post<Gateway>(
          `http://localhost:3000/gateways`,
          args
        );

        return resp.data;
      },
    },

    updateGateway: {
      type: GatewayType,
      args: {
        id: { type: GraphQLString },
        serial: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve: async (source: void, args: Gateway): Promise<Gateway> => {
        const resp = await axios.patch<Gateway>(
          `http://localhost:3000/gateways/${args.id}`,
          args
        );

        return resp.data;
      },
    },

    deleteGateway: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (source: void, args: Gateway): Promise<boolean> => {
        const resp = await axios.delete(
          `http://localhost:3000/gateways/${args.id}`
        );

        return resp.status === 200;
      },
    },
    // createPeripheral
    // updatePeripheral
    // deletePeripheral
  },
});
