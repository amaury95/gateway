import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import mutations from "./resolvers/mutations";
import queries from "./resolvers/queries";

const server = new ApolloServer({
  schema:new GraphQLSchema({
    query: queries,
    mutation: mutations,
  }),
})

server.listen().then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(`graphql api ready: ${url}`);
});