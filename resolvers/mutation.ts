import { GraphQLError } from "graphql";
import { petModel } from "../db/mascotas.ts";
import { Pet } from "../types.ts";

const MutationResolvers = {
  addPet: async (_parent: unknown, args: { name: string; breed: string }): Promise<Pet> => {
    const pet = new petModel(args);
    if (await petModel.findOne({ id: args.id })) {
      throw new GraphQLError("Existing id");
    }
    await pet.save();
    return pet.toObject();
  },
};

export default MutationResolvers;