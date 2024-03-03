import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { GraphQLContext } from '../types/main.js';
import { CreateUserArgs, CreateUserInputType, UserType } from '../types/user.js';

const CreateUserMutation: GraphQLFieldConfig<undefined, GraphQLContext, CreateUserArgs> =
  {
    description: 'Create new user',
    type: new GraphQLNonNull(UserType),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInputType) },
    },
    resolve: (_, { dto }, { prisma }) => {
      return prisma.user.create({ data: dto });
    },
  };

export { CreateUserMutation };
