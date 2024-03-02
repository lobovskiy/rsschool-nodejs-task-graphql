import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLSchema } from 'graphql';
import { GraphQLContext } from './types/main.js';
import { UsersQuery } from './queries/user.js';
import { PostsQuery } from './queries/post.js';
import { MemberTypesQuery } from './queries/member-type.js';
import { ProfilesQuery } from './queries/profile.js';

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
  fields: () => ({
    users: UsersQuery,
    posts: PostsQuery,
    memberTypes: MemberTypesQuery,
    profiles: ProfilesQuery,
  }),
};
const query = new GraphQLObjectType(queryConfig);

export const schema = new GraphQLSchema({ query });
