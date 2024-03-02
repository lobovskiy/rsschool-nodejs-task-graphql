import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { MemberTypeType } from '../types/member-type.js';
import { getAllMemberTypes } from '../resolvers/member-type.js';

const MemberTypesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all member types',
  type: new GraphQLList(MemberTypeType),
  resolve: getAllMemberTypes,
};

export { MemberTypesQuery };
