import { GraphQLFieldConfig, GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  ChangeUserArgs,
  ChangeUserInputType,
  CreateUserArgs,
  CreateUserInputType,
  UserArgs,
  UserSubscriptionArgs,
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

const SubscribeToMutation: GraphQLFieldConfig<
  undefined,
  GraphQLContext,
  UserSubscriptionArgs
> = {
  description: 'Subscribe user to another user',
  type: UserType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: (_, { userId, authorId }, { prisma }) => {
    return prisma.user.update({
      where: { id: userId },
      data: { userSubscribedTo: { create: { authorId } } },
    });
  },
};

const UnsubscribeFromMutation: GraphQLFieldConfig<
  undefined,
  GraphQLContext,
  UserSubscriptionArgs
> = {
  description: 'Unsubscribe user from another user',
  type: new GraphQLScalarType({ name: 'UnsubscribeFromNullableReturnType' }),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, { userId, authorId }, { prisma }) => {
    await prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId: userId, authorId } },
    });
  },
};

export {
  CreateUserMutation,
  ChangeUserMutation,
  DeleteUserMutation,
  SubscribeToMutation,
  UnsubscribeFromMutation,
};
