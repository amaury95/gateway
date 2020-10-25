import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import queries from "./resolvers/queries";
import { PeripheralStatusType, PeripheralType } from "./types/peripheral";

const server = new ApolloServer({
  schema:new GraphQLSchema({
    query: queries
  }),
})

server.listen().then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(`graphql api ready: ${url}`);
});