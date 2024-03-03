import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MemberTypeQuery, MemberTypesQuery } from './queries/member-type.js';
import { PostQuery, PostsQuery } from './queries/post.js';
import { UserQuery, UsersQuery } from './queries/user.js';
import { ProfileQuery, ProfilesQuery } from './queries/profile.js';
import {
  ChangePostMutation,
  CreatePostMutation,
  DeletePostMutation,
} from './mutations/post.js';
import {
  ChangeUserMutation,
  CreateUserMutation,
  DeleteUserMutation,
} from './mutations/user.js';
import {
  ChangeProfileMutation,
  CreateProfileMutation,
  DeleteProfileMutation,
} from './mutations/profile.js';

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

const query = new GraphQLObjectType({
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
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: CreateUserMutation,
    changeUser: ChangeUserMutation,
    deleteUser: DeleteUserMutation,
    createPost: CreatePostMutation,
    changePost: ChangePostMutation,
    deletePost: DeletePostMutation,
    createProfile: CreateProfileMutation,
    changeProfile: ChangeProfileMutation,
    deleteProfile: DeleteProfileMutation,
  }),
});

export const schema = new GraphQLSchema({ query, mutation });
