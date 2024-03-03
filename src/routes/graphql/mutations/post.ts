import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { CreatePostArgs, CreatePostInputType, PostType } from '../types/post.js';

const CreatePostMutation: GraphQLFieldConfig<undefined, GraphQLContext, CreatePostArgs> =
  {
    description: 'Create new post',
    type: new GraphQLNonNull(PostType),
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInputType) },
    },
    resolve: (_, { dto }, { prisma }) => {
      return prisma.post.create({ data: dto });
    },
  };

export { CreatePostMutation };
