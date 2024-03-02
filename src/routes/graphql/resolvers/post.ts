import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';

export const getAllPosts: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.post.findMany();
};
