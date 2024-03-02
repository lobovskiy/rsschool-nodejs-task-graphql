import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileArgs, ProfileType } from '../types/profile.js';

const ProfilesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all profiles',
  type: new GraphQLList(new GraphQLNonNull(ProfileType)),
  resolve: (_, __, { prisma }) => {
    return prisma.profile.findMany();
  },
};

const ProfileQuery: GraphQLFieldConfig<undefined, GraphQLContext, ProfileArgs> = {
  description: 'Get profile by id',
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: (_, { id }, { prisma }) => {
    return prisma.profile.findUnique({ where: { id } });
  },
};

export { ProfilesQuery, ProfileQuery };
