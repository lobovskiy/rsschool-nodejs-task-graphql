import { GraphQLList } from 'graphql/index.js';
import { GraphQLFieldConfig } from 'graphql/type/definition.js';
import { GraphQLContext } from '../types/main.js';
import { ProfileType } from '../types/profile.js';
import { getProfiles } from '../resolvers/profile.js';

const ProfilesQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all profiles',
  type: new GraphQLList(ProfileType),
  resolve: getProfiles,
};

export { ProfilesQuery };
