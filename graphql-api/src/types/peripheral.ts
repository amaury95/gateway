import {
  GraphQLEnumType,
  GraphQLID,
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
  uid: number;
  gatewayId: string;
  vendor: string;
  created: string;
  status: PeripheralStatus;
};

export const PeripheralType = new GraphQLObjectType({
  name: "Peripheral",
  fields: {
    uid: {
      type: GraphQLID,
      resolve: (source: Peripheral): number => source.uid,
    },
    gatewayId: {
      type: GraphQLString,
      resolve: (source: Peripheral): string => source.gatewayId,
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
