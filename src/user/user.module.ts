import { Module } from '@nestjs/common';
import { UserResolvers } from './user.resolvers';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolvers],
})
export class UserModule {}
