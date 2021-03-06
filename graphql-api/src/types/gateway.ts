import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PeripheralType } from "./peripheral";

export type Gateway = {
  _id: string;
  serial: string;
  name: string;
  address: string;
};

export const GatewayType = new GraphQLObjectType({
  name: "Gateway",
  fields: {
    id: {
      type: GraphQLID,
      resolve: (source: Gateway): string => source._id,
    },
    serial: {
      type: GraphQLString,
      resolve: (source: Gateway): string => source.serial,
    },
    name: {
      type: GraphQLString,
      resolve: (source: Gateway): string => source.name,
    },
    address: {
      type: GraphQLString,
      resolve: (source: Gateway): string => source.address,
    },
    edges: {
      type: new GraphQLObjectType({
        name: "GatewayEdges",
        fields: {
          peripherals: {
            type: GraphQLList(PeripheralType),
            resolve: async (source: Gateway, _args, { dataSources }) =>
              dataSources.gatewaysAPI.getPeripherals(source._id),
          },
        },
      }),
      resolve: (source: Gateway): Gateway => source,
    },
  },
});
