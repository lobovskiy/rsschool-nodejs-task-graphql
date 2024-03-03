import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  CreateProfileArgs,
  CreateProfileInputType,
  ProfileArgs,
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

const DeleteProfileMutation: GraphQLFieldConfig<undefined, GraphQLContext, ProfileArgs> =
  {
    description: 'Delete existing profile',
    type: UUIDType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }, { prisma }) => {
      try {
        await prisma.profile.delete({ where: { id } });

        return id;
      } catch {
        return null;
      }
    },
  };

export { CreateProfileMutation, DeleteProfileMutation };
