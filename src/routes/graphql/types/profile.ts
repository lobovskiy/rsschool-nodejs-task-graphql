import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { MemberTypeType } from './member-type.js';

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export type ProfileArgs = Pick<IProfile, 'id'>;

export const ProfileType = new GraphQLObjectType<IProfile, GraphQLContext>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: (profile, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: profile.userId } }),
    },
    memberType: {
      type: new GraphQLNonNull(MemberTypeType),
      resolve: (profile, _, { prisma }) =>
        prisma.memberType.findUnique({ where: { id: profile.memberTypeId } }),
    },
  }),
});
