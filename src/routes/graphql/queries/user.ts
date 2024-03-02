import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UserType } from '../types/user.js';
import { getAllUsers } from '../resolvers/user.js';

const UsersQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all users',
  type: new GraphQLList(UserType),
  resolve: getAllUsers,
};

export { UsersQuery };
