import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IPost } from './post.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { DataLoaders } from '../data-loaders.js';

export interface IDataLoaders {
  postsByAuthorIdLoader: DataLoader<string, IPost[]>;
  memberTypeLoader: DataLoader<MemberTypeId, MemberType>;
}

export type GraphQLContext = {
  prisma: PrismaClient;
  dataLoaders: DataLoaders;
};
