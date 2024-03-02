import { GraphQLContext } from '../types/main.js';
import { GraphQLFieldResolver } from 'graphql/type/index.js';

export const getMemberTypes: GraphQLFieldResolver<undefined, GraphQLContext, object> = (
  _,
  __,
  { prisma },
) => {
  return prisma.memberType.findMany();
};
