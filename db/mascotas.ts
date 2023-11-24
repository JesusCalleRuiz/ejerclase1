import mongoose from "npm:mongoose@7.6.3";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: {type: String, required: true}
  },
  { timestamps: true }
);

export type petModelType = mongoose.Document & Omit<Pet, "id">;

const petModel = mongoose.model<petModelType>("Pet", petSchema);

export {petModel};