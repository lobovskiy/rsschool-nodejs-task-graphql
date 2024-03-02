import { GraphQLList } from 'graphql/index.js';
import { UserType } from '../types/user.js';
import { getAllUsers } from '../resolvers/user.js';
import { GraphQLFieldConfig } from 'graphql/type/definition.js';
import { GraphQLContext } from '../types/main.js';

const UsersQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all users',
  type: new GraphQLList(UserType),
  resolve: getAllUsers,
};

export { UsersQuery };
