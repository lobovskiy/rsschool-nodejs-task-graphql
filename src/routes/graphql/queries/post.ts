import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { PostType } from '../types/post.js';
import { getAllPosts } from '../resolvers/post.js';

const PostsQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all posts',
  type: new GraphQLList(PostType),
  resolve: getAllPosts,
};

export { PostsQuery };
