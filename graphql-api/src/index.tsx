import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import GatewayAPI from "./datasources/gateways_api";
import PeripheralAPI from "./datasources/peripherals_api";
import mutations from "./schema/mutations";
import queries from "./schema/queries";
import subscriptions from "./schema/subscriptions";

const server = new ApolloServer({
  schema:new GraphQLSchema({
    query: queries,
    mutation: mutations,
    subscription: subscriptions,
  }),
  dataSources: ()=>({
    peripheralsAPI: new PeripheralAPI(),
    gatewaysAPI: new GatewayAPI(),
  })
})

server.listen().then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(`graphql api ready: ${url}`);
});