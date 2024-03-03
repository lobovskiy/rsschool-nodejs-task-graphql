import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export type PostArgs = Pick<IPost, 'id'>;
export type CreatePostArgs = {
  dto: Pick<IPost, 'authorId' | 'content' | 'title'>;
};

export const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: (post, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: post.authorId } }),
    },
  }),
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    authorId: { type: new GraphQLNonNull(UUIDType) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
});
