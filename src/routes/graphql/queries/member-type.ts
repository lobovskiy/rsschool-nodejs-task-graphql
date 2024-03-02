import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { MemberTypeIdType, MemberTypeType } from '../types/member-type.js';
import { getAllMemberTypes, getMemberType } from '../resolvers/member-type.js';

const MemberTypesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all member types',
  type: new GraphQLList(new GraphQLNonNull(MemberTypeType)),
  resolve: getAllMemberTypes,
};

const MemberTypeQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get member type by id',
  type: MemberTypeType,
  args: {
    id: { type: new GraphQLNonNull(MemberTypeIdType) },
  },
  resolve: getMemberType,
};

export { MemberTypesQuery, MemberTypeQuery };
