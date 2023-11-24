import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import mongoose from "npm:mongoose@7.6.3";
import { schema } from "./graphqlSchema.ts";
import QueryResolvers from "./resolvers/query.ts";
import MutationResolvers from "./resolvers/mutation.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: QueryResolvers,
    Mutation: MutationResolvers,
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);