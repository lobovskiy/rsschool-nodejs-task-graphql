import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { PostArgs } from '../types/post.js';

export const getAllPosts: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.post.findMany();
};

export const getPost: GraphQLFieldResolver<undefined, GraphQLContext, PostArgs> = (
  _,
  { id },
  { prisma },
) => {
  return prisma.post.findUnique({ where: { id } });
};
