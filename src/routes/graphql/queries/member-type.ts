import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { MemberTypeIdType } from '../types/member-type-id.js';
import { MemberTypeArgs, MemberTypeType } from '../types/member-type.js';

const MemberTypesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all member types',
  type: new GraphQLList(new GraphQLNonNull(MemberTypeType)),
  resolve: (_, __, { prisma }) => {
    return prisma.memberType.findMany();
  },
};

const MemberTypeQuery: GraphQLFieldConfig<undefined, GraphQLContext, MemberTypeArgs> = {
  description: 'Get member type by id',
  type: MemberTypeType,
  args: {
    id: { type: new GraphQLNonNull(MemberTypeIdType) },
  },
  resolve: (_, { id }, { prisma }) => {
    return prisma.memberType.findUnique({ where: { id } });
  },
};

export { MemberTypesQuery, MemberTypeQuery };
