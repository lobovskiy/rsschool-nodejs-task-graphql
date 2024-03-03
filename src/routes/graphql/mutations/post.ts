import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  CreatePostArgs,
  CreatePostInputType,
  PostArgs,
  PostType,
} from '../types/post.js';

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

const DeletePostMutation: GraphQLFieldConfig<undefined, GraphQLContext, PostArgs> = {
  description: 'Delete existing post',
  type: UUIDType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, { id }, { prisma }) => {
    try {
      await prisma.post.delete({ where: { id } });

      return id;
    } catch {
      return null;
    }
  },
};

export { CreatePostMutation, DeletePostMutation };
