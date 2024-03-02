import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
}

export const ProfileType = new GraphQLObjectType<IProfile, GraphQLContext>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
