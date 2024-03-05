import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { GraphQLContext } from './main.js';
import { ProfileType } from './profile.js';
import { MemberTypeId, MemberTypeIdType } from './member-type-id.js';

export interface IMemberType {
  id: MemberTypeId;
  discount: number;
  postsLimitPerMonth: number;
}

export type MemberTypeArgs = Pick<IMemberType, 'id'>;

export const MemberTypeType: GraphQLObjectType<IMemberType, GraphQLContext> =
  new GraphQLObjectType<IMemberType, GraphQLContext>({
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeIdType) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
      profiles: {
        type: new GraphQLList(new GraphQLNonNull(ProfileType)),
        resolve: (
          memberType,
          _,
          { dataLoaders: { profilesByMemberTypeIdBatchLoader } },
        ) => profilesByMemberTypeIdBatchLoader.load(memberType.id),
      },
    }),
  });
