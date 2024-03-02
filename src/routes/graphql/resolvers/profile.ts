import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';

export const getAllProfiles: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.profile.findMany();
};
