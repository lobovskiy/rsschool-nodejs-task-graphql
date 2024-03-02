import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/user.js';
import { getAllUsers, getUser } from '../resolvers/user.js';

const UsersQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all users',
  type: new GraphQLList(UserType),
  resolve: getAllUsers,
};

const UserQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get user by id',
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getUser,
};

export { UsersQuery, UserQuery };
