import { GraphQLList, GraphQLObjectType } from "graphql";
import axios from "axios";

import { GatewayType, Gateway } from "../types/gateway";
import { PeripheralType, Peripheral } from "../types/peripheral";

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    getGateways: {
      type: GraphQLList(GatewayType),
      resolve: async (): Promise<Gateway[]> => {
        const resp = await await axios.get<Gateway[]>(
          `http://localhost:3000/gateways`
        );
        return resp.data;
      },
    },
    getGateway: {
      type: GatewayType,
      resolve: async (source: void, args: any): Promise<Gateway> => {
        const id = "1";
        const resp = await await axios.get<Gateway>(
          `http://localhost:3000/gateways/${id}`
        );
        return resp.data;
      },
    },

    getPeripherals: {
      type: GraphQLList(PeripheralType),
      resolve: async (): Promise<Peripheral[]> => {
        const resp = await await axios.get<Peripheral[]>(
          `http://localhost:3000/peripherals`
        );
        return resp.data;
      },
    },
    getPeripheral: {
      type: PeripheralType,
      resolve: async (source: void, args: any): Promise<Peripheral> => {
        const id = "1";
        const resp = await await axios.get<Peripheral>(
          `http://localhost:3000/peripherals/${id}`
        );
        return resp.data;
      },
    },
  },
});
