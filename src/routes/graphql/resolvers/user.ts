import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';

export const getAllUsers: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.user.findMany();
};
