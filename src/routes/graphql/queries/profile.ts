import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { ProfileType } from '../types/profile.js';
import { getAllProfiles } from '../resolvers/profile.js';

const ProfilesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all profiles',
  type: new GraphQLList(ProfileType),
  resolve: getAllProfiles,
};

export { ProfilesQuery };
