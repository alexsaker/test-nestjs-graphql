import {
  Hello,
  User,
  UserCollectionResult,
  UserInput,
  UserBasic,
} from '../graphql';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { UserService } from './user.service';
import { ApolloError } from 'apollo-server-core';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query()
  async findAllUsers(): Promise<UserCollectionResult> {
    try {
      const result = await this.userService.findAll();
      return result[0];
    } catch (err) {
      throw new ApolloError(err);
    }
  }
  @Mutation('saveUser')
  async saveName(@Args('user') user: UserInput): Promise<UserBasic> {
    try {
      const result = await this.userService.saveUser(user);
      return result[0];
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
