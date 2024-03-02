import { GraphQLFieldResolver } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { MemberTypeArgs } from '../types/member-type.js';

export const getAllMemberTypes: GraphQLFieldResolver<
  undefined,
  GraphQLContext,
  object
> = (_, __, { prisma }) => {
  return prisma.memberType.findMany();
};

export const getMemberType: GraphQLFieldResolver<
  undefined,
  GraphQLContext,
  MemberTypeArgs
> = (_, { id }, { prisma }) => {
  return prisma.memberType.findUnique({ where: { id } });
};
