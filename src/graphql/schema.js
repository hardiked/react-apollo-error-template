import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLUnionType,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql";

const DogType = new GraphQLObjectType({
  name: "Dog",
  fields: {
    id: { type: GraphQLID },
    dogName: { type: GraphQLString },
  },
});

const CatType = new GraphQLObjectType({
  name: "Cat",
  fields: {
    id: { type: GraphQLID },
    catName: { type: GraphQLString },
  },
});

var PetType = new GraphQLUnionType({
  name: "Pet",
  types: [DogType, CatType],
  resolveType(value) {
    if (value.dogName) {
      return DogType;
    }
    if (value.catName) {
      return CatType;
    }
    return DogType;
  },
});

const petData = [
  { id: 1, dogName: "Tom" },
  { id: 2, catName: "Kity" },
  { id: 3, dogName: "Max" },
  { id: 4, catName: "Daisy" },
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    pets: {
      type: new GraphQLList(PetType),
      resolve: () => petData,
    },
  },
});

const ErrorObjectType = new GraphQLObjectType({
  name: "ErrorType",
  fields: {
    path: { type: GraphQLString },
    message: { type: GraphQLString },
  },
});

const ErrorType = new GraphQLObjectType({
  name: "Error",
  fields: {
    error: { type: new GraphQLList(ErrorObjectType) },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  },
});

var RegisterType = new GraphQLUnionType({
  name: "Register",
  types: [ErrorType, UserType],
  resolveType(value) {
    if (value.error) {
      return ErrorType;
    }
    if (value.email) {
      return UserType;
    }
    return ErrorType;
  },
});

const data = {
  error: [
    {
      path: "email",
      message: "in use",
    },
  ],
};

const InputType = new GraphQLInputObjectType({
  name: "RegisterInput",
  fields: () => ({
    email: { type: GraphQLString },
  }),
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: RegisterType,
      args: {
        input: {
          type: new GraphQLNonNull(InputType),
        },
      },
      resolve: (_, { input }) => {
        console.log(_, input);
        if (input.email) {
          return {
            email: input.email,
            username: input.email,
          };
        }
        return data;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
