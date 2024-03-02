import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profile.js';
import { getAllProfiles, getProfile } from '../resolvers/profile.js';

const ProfilesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all profiles',
  type: new GraphQLList(ProfileType),
  resolve: getAllProfiles,
};

const ProfileQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get profile by id',
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getProfile,
};

export { ProfilesQuery, ProfileQuery };
