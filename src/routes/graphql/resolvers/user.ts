import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UserArgs } from '../types/user.js';

export const getAllUsers: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.user.findMany();
};

export const getUser: GraphQLFieldResolver<undefined, GraphQLContext, UserArgs> = (
  _,
  { id },
  { prisma },
) => {
  return prisma.user.findUnique({ where: { id } });
};
