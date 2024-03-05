import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { UserArgs, UserType } from '../types/user.js';

const UsersQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all users',
  type: new GraphQLList(new GraphQLNonNull(UserType)),
  resolve: (_, __, { prisma }) => {
    return prisma.user.findMany();
  },
};

const UserQuery: GraphQLFieldConfig<undefined, GraphQLContext, UserArgs> = {
  description: 'Get user by id',
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: (_, { id }, { prisma }) => {
    return prisma.user.findUnique({ where: { id } });
  },
};

export { UsersQuery, UserQuery };
