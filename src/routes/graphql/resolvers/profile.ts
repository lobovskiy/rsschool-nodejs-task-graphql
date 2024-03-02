import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { ProfileArgs } from '../types/profile.js';

export const getAllProfiles: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.profile.findMany();
};

export const getProfile: GraphQLFieldResolver<undefined, GraphQLContext, ProfileArgs> = (
  _,
  { id },
  { prisma },
) => {
  return prisma.profile.findUnique({ where: { id } });
};
