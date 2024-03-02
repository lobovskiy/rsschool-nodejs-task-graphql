import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLSchema } from 'graphql';
import { GraphQLContext } from './types/main.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const queryConfig: GraphQLObjectTypeConfig<undefined, GraphQLContext> = {
  name: 'Query',
  fields: () => ({}),
};
const query = new GraphQLObjectType(queryConfig);

export const schema = new GraphQLSchema({ query });
