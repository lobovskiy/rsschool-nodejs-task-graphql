import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { GraphQLContext } from './main.js';

export enum MemberTypeIds {
  Basic = 'basic',
  Business = 'business',
}

export interface IMemberType {
  id: MemberTypeIds;
  discount: number;
  postsLimitPerMonth: number;
}

export const MemberTypeIdsType = new GraphQLEnumType({
  name: 'MemberTypes',
  values: {
    [MemberTypeIds.Basic]: {
      value: MemberTypeIds.Basic,
    },
    [MemberTypeIds.Business]: {
      value: MemberTypeIds.Business,
    },
  },
});

export const MemberTypeType = new GraphQLObjectType<IMemberType, GraphQLContext>({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeIdsType },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
