import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
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

export { CreateUserMutation, DeleteUserMutation };
