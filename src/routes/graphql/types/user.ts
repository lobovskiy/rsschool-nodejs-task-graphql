import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLContext } from './main.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { GraphQLInputObjectType } from 'graphql/index.js';

export interface ISubscription {
  subscriberId: string;
  authorId: string;
}

export interface IUser {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: ISubscription[];
  subscribedToUser?: ISubscription[];
}

export type UserArgs = Pick<IUser, 'id'>;
export type CreateUserArgs = {
  dto: Pick<IUser, 'name' | 'balance'>;
};
export type ChangeUserArgs = Pick<IUser, 'id'> & {
  dto: Partial<Pick<IUser, 'name' | 'balance'>>;
};
export type UserSubscriptionArgs = {
  userId: Pick<IUser, 'id'>['id'];
  authorId: Pick<IUser, 'id'>['id'];
};

export const UserType: GraphQLObjectType<IUser, GraphQLContext> = new GraphQLObjectType<
  IUser,
  GraphQLContext
>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (user, _, { dataLoaders: { profileByUserIdBatchLoader } }) =>
        profileByUserIdBatchLoader.load(user.id),
    },
    posts: {
      type: new GraphQLList(new GraphQLNonNull(PostType)),
      resolve: async (user, _, { dataLoaders: { postsByAuthorIdBatchLoader } }) =>
        postsByAuthorIdBatchLoader.load(user.id),
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: (user, _, { dataLoaders: { userBatchLoader } }) => {
        if (user.userSubscribedTo) {
          return userBatchLoader.loadMany(
            user.userSubscribedTo.map((subscription) => subscription.authorId),
          );
        }
      },
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: (user, _, { dataLoaders: { userBatchLoader } }) => {
        if (user.subscribedToUser) {
          return userBatchLoader.loadMany(
            user.subscribedToUser.map((subscription) => subscription.subscriberId),
          );
        }
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
