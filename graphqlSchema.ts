
export const schema = `#graphql
type Pet{
  id: ID!       
  name: String!
  breed: String!
}

type Query{
  pets(breed: String): [Pet!]! 
  pet(id: ID!):Pet!
}

type Mutation{
  addPet(name: String!, breed: String!, id: ID!):Pet!
}

`;