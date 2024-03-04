import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { MemberTypeId } from './types/member-type-id.js';
import { IPost } from './types/post.js';
import { IMemberType } from './types/member-type.js';
import { IProfile } from './types/profile.js';

export class DataLoaders {
  public memberTypeBatchLoader: DataLoader<MemberTypeId, IMemberType>;

  public profilesByMemberTypeIdBatchLoader: DataLoader<string, IProfile[]>;

  public profileByUserIdBatchLoader: DataLoader<string, IProfile>;

  public postsByAuthorIdBatchLoader: DataLoader<string, IPost[]>;

  constructor(private prisma: PrismaClient) {
    this.memberTypeBatchLoader = new DataLoader(this.getMemberTypeById.bind(this));
    this.profilesByMemberTypeIdBatchLoader = new DataLoader(
      this.getProfilesByMemberTypeId.bind(this),
    );
    this.profileByUserIdBatchLoader = new DataLoader(this.getProfileByUserId.bind(this));
    this.postsByAuthorIdBatchLoader = new DataLoader(this.getPostsByAuthorId.bind(this));
  }

  private async getMemberTypeById(memberTypeIds: readonly MemberTypeId[]) {
    const memberTypes = (await this.prisma.memberType.findMany({
      where: { id: { in: [...memberTypeIds] } },
    })) as IMemberType[];

    const memberTypesById = memberTypes.reduce(
      (accMemberTypesById, memberType) => {
        accMemberTypesById[memberType.id] = memberType;

        return accMemberTypesById;
      },
      {} as Record<MemberTypeId, IMemberType>,
    );

    return memberTypeIds.map((memberTypeId) => memberTypesById[memberTypeId]);
  }

  private async getProfilesByMemberTypeId(memberTypeIds: readonly MemberTypeId[]) {
    const profiles = (await this.prisma.profile.findMany({
      where: { memberTypeId: { in: [...memberTypeIds] } },
    })) as IProfile[];

    const profilesByMemberTypeId = profiles.reduce(
      (accProfilesByMemberTypeId, profile) => {
        accProfilesByMemberTypeId[profile.memberTypeId]
          ? accProfilesByMemberTypeId[profile.memberTypeId].push(profile)
          : (accProfilesByMemberTypeId[profile.memberTypeId] = [profile]);

        return accProfilesByMemberTypeId;
      },
      {} as Record<string, IProfile[]>,
    );

    return memberTypeIds.map((memberTypeId) => profilesByMemberTypeId[memberTypeId]);
  }

  private async getProfileByUserId(userIds: readonly string[]) {
    const profiles = (await this.prisma.profile.findMany({
      where: { userId: { in: [...userIds] } },
    })) as IProfile[];

    const profilesByUserId = profiles.reduce(
      (accProfilesByUserId, profile) => {
        accProfilesByUserId[profile.userId] = profile;

        return accProfilesByUserId;
      },
      {} as Record<string, IProfile>,
    );

    return userIds.map((userId) => profilesByUserId[userId]);
  }

  private async getPostsByAuthorId(authorIds: readonly string[]) {
    const posts = await this.prisma.post.findMany({
      where: { authorId: { in: [...authorIds] } },
    });

    const postsByAuthorId = posts.reduce(
      (accPostsByAuthorId, post) => {
        accPostsByAuthorId[post.authorId]
          ? accPostsByAuthorId[post.authorId].push(post)
          : (accPostsByAuthorId[post.authorId] = [post]);

        return accPostsByAuthorId;
      },
      {} as Record<string, IPost[]>,
    );

    return authorIds.map((authorId) => postsByAuthorId[authorId]);
  }
}
