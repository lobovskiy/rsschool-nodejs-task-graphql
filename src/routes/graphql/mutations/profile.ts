import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import {
  CreateProfileArgs,
  CreateProfileInputType,
  ProfileType,
} from '../types/profile.js';

const CreateProfileMutation: GraphQLFieldConfig<
  undefined,
  GraphQLContext,
  CreateProfileArgs
> = {
  description: 'Create new profile',
  type: new GraphQLNonNull(ProfileType),
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInputType) },
  },
  resolve: (_, { dto }, { prisma }) => {
    return prisma.profile.create({ data: dto });
  },
};

export { CreateProfileMutation };
