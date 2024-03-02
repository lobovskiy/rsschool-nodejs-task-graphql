import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.js';
import { getAllPosts, getPost } from '../resolvers/post.js';

const PostsQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get all posts',
  type: new GraphQLList(PostType),
  resolve: getAllPosts,
};

const PostQuery: GraphQLFieldConfig<undefined, GraphQLContext> = {
  description: 'Get post by id',
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getPost,
};

export { PostsQuery, PostQuery };
