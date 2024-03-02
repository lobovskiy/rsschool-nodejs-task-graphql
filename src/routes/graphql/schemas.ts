import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLSchema } from 'graphql';
import { GraphQLContext } from './types/main.js';
import { MemberTypeQuery, MemberTypesQuery } from './queries/member-type.js';
import { PostQuery, PostsQuery } from './queries/post.js';
import { UserQuery, UsersQuery } from './queries/user.js';
import { ProfileQuery, ProfilesQuery } from './queries/profile.js';

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
    memberTypes: MemberTypesQuery,
    memberType: MemberTypeQuery,
    posts: PostsQuery,
    post: PostQuery,
    users: UsersQuery,
    user: UserQuery,
    profiles: ProfilesQuery,
    profile: ProfileQuery,
  }),
};
const query = new GraphQLObjectType(queryConfig);

export const schema = new GraphQLSchema({ query });
