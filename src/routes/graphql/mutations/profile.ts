import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  ChangeProfileArgs,
  ChangeProfileInputType,
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

const ChangeProfileMutation: GraphQLFieldConfig<
  undefined,
  GraphQLContext,
  ChangeProfileArgs
> = {
  description: 'Change existing profile',
  type: new GraphQLNonNull(ProfileType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
  },
  resolve: (_, { id, dto }, { prisma }) => {
    return prisma.profile.update({ where: { id }, data: dto });
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
      await prisma.profile.delete({ where: { id } });

      return id;
    },
  };

export { CreateProfileMutation, ChangeProfileMutation, DeleteProfileMutation };
