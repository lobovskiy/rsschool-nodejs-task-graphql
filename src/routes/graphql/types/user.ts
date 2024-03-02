import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from './main.js';

export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
