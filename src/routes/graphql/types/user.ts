import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';

export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export type UserArgs = Pick<IUser, 'id'>;

export const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (user, _, { prisma }) =>
        prisma.profile.findUnique({ where: { userId: user.id } }),
    },
  }),
});
