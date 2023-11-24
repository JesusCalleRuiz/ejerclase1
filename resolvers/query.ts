import { GraphQLError } from "graphql";
import { petModel } from "../db/mascotas.ts";
import { Pet } from "../types.ts";

const QueryResolvers = {
  pets: async (_parent: unknown, args: { breed?: string }): Promise<Pet[]> => {
    if (args.breed) {
      return petModel.find({ breed: args.breed });
    }
    return petModel.find();
  },
  pet: async (_parent: unknown, args: { id: string }): Promise<Pet> => {
    const { id } = args;
    const pet = await petModel.findById(id);
    if (!pet) throw new GraphQLError("Pet not found");
    return pet;
  },
};

export default QueryResolvers;