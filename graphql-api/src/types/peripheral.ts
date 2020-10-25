import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export enum PeripheralStatus {
  offline,
  online,
}

export const PeripheralStatusType = new GraphQLEnumType({
  name: "PeripheralStatus",
  values: {
    offline: { value: PeripheralStatus.offline },
    online: { value: PeripheralStatus.online },
  },
});

export type Peripheral = {
  id: string;
  uid: number;
  gatewayId: string;
  vendor: string;
  created: string;
  status: PeripheralStatus;
};

export const PeripheralType = new GraphQLObjectType({
  name: "Peripheral",
  fields: {
    id: {
      type: GraphQLID,
      resolve: (source: Peripheral): string => source.id,
    },
    gatewayId: {
      type: GraphQLString,
      resolve: (source: Peripheral): string => source.gatewayId,
    },
    uid: {
      type: GraphQLInt,
      resolve: (source: Peripheral): number => source.uid,
    },
    vendor: {
      type: GraphQLString,
      resolve: (source: Peripheral): string => source.vendor,
    },
    created: {
      type: GraphQLString,
      resolve: (source: Peripheral): string => source.created,
    },
    status: {
      type: PeripheralStatusType,
      resolve: (source: Peripheral): PeripheralStatus => source.status,
    },
  },
});
