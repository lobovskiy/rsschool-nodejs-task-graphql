import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { PostArgs, PostType } from '../types/post.js';

const PostsQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all posts',
  type: new GraphQLList(new GraphQLNonNull(PostType)),
  resolve: (_, __, { prisma }) => {
    return prisma.post.findMany();
  },
};

const PostQuery: GraphQLFieldConfig<undefined, GraphQLContext, PostArgs> = {
  description: 'Get post by id',
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: (_, { id }, { prisma }) => {
    return prisma.post.findUnique({ where: { id } });
  },
};

export { PostsQuery, PostQuery };
