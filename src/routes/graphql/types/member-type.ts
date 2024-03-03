import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { GraphQLContext } from './main.js';
import { ProfileType } from './profile.js';

export enum MemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export interface IMemberType {
  id: MemberTypeId;
  discount: number;
  postsLimitPerMonth: number;
}

export type MemberTypeArgs = Pick<IMemberType, 'id'>;

export const MemberTypeIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: {
      value: MemberTypeId.BASIC,
    },
    [MemberTypeId.BUSINESS]: {
      value: MemberTypeId.BUSINESS,
    },
  },
});

export const MemberTypeType: GraphQLObjectType<IMemberType, GraphQLContext> =
  new GraphQLObjectType<IMemberType, GraphQLContext>({
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeIdType) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
      profiles: {
        type: new GraphQLList(new GraphQLNonNull(ProfileType)),
        resolve: (memberType, _, { prisma }) =>
          prisma.profile.findMany({ where: { memberTypeId: memberType.id } }),
      },
    }),
  });
