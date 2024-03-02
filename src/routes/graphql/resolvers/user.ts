import { GraphQLContext } from '../types/main.js';
import { GraphQLFieldResolver } from 'graphql/type/index.js';

export const getUsers: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.user.findMany();
};
