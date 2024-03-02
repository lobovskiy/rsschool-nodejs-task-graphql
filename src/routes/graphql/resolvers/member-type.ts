import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';

export const getAllMemberTypes: GraphQLFieldResolver<
  undefined,
  GraphQLContext,
  object
> = (_, __, { prisma }) => {
  return prisma.memberType.findMany();
};
