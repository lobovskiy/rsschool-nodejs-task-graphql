import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from './main.js';

export interface IPost {
  id: string;
  title: string;
  content: string;
}

export const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
