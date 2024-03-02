import { GraphQLList } from 'graphql/index.js';
import { GraphQLFieldConfig } from 'graphql/type/definition.js';
import { GraphQLContext } from '../types/main.js';
import { PostType } from '../types/post.js';
import { getPosts } from '../resolvers/post.js';

const PostsQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all posts',
  type: new GraphQLList(PostType),
  resolve: getPosts,
};

export { PostsQuery };
