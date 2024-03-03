import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { UUIDType } from '../types/uuid.js';
import {
  ChangePostArgs,
  ChangePostInputType,
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

const ChangePostMutation: GraphQLFieldConfig<undefined, GraphQLContext, ChangePostArgs> =
  {
    description: 'Change existing post',
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    resolve: (_, { id, dto }, { prisma }) => {
      return prisma.post.update({ where: { id }, data: dto });
    },
  };

const DeletePostMutation: GraphQLFieldConfig<undefined, GraphQLContext, PostArgs> = {
  description: 'Delete existing post',
  type: UUIDType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, { id }, { prisma }) => {
    await prisma.post.delete({ where: { id } });

    return id;
  },
};

export { CreatePostMutation, ChangePostMutation, DeletePostMutation };
