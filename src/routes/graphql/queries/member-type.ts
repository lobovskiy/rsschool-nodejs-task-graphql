import { GraphQLList } from 'graphql/index.js';
import { GraphQLFieldConfig } from 'graphql/type/definition.js';
import { GraphQLContext } from '../types/main.js';
import { getMemberTypes } from '../resolvers/member-type.js';
import { MemberTypeType } from '../types/member-type.js';

const MemberTypesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all member types',
  type: new GraphQLList(MemberTypeType),
  resolve: getMemberTypes,
};

export { MemberTypesQuery };
