import { GraphQLEnumType } from 'graphql/index.js';

export enum MemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

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
