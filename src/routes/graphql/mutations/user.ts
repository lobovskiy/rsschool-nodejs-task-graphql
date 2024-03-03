import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  ChangeUserArgs,
  ChangeUserInputType,
  CreateUserArgs,
  CreateUserInputType,
  UserArgs,
  UserType,
} from '../types/user.js';

const CreateUserMutation: GraphQLFieldConfig<undefined, GraphQLContext, CreateUserArgs> =
  {
    description: 'Create new user',
    type: new GraphQLNonNull(UserType),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInputType) },
    },
    resolve: (_, { dto }, { prisma }) => {
      return prisma.user.create({ data: dto });
    },
  };

const ChangeUserMutation: GraphQLFieldConfig<undefined, GraphQLContext, ChangeUserArgs> =
  {
    description: 'Change existing user',
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    resolve: async (_, { id, dto }, { prisma }) => {
      try {
        return await prisma.user.update({
          where: { id },
          data: dto,
        });
      } catch {
        return null;
      }
    },
  };

const DeleteUserMutation: GraphQLFieldConfig<undefined, GraphQLContext, UserArgs> = {
  description: 'Delete existing user',
  type: UUIDType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, { id }, { prisma }) => {
    try {
      await prisma.user.delete({ where: { id } });

      return id;
    } catch {
      return null;
    }
  },
};

export { CreateUserMutation, ChangeUserMutation, DeleteUserMutation };
