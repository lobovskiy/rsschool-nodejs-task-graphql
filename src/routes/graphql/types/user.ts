import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';

export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export type UserArgs = Pick<IUser, 'id'>;

export const UserType: GraphQLObjectType<IUser, GraphQLContext> = new GraphQLObjectType<
  IUser,
  GraphQLContext
>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (user, _, { prisma }) =>
        prisma.profile.findUnique({ where: { userId: user.id } }),
    },
    posts: {
      type: new GraphQLList(new GraphQLNonNull(PostType)),
      resolve: (user, _, { prisma }) =>
        prisma.post.findMany({ where: { authorId: user.id } }),
    },
  }),
});
