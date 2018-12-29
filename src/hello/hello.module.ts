import { HelloResolvers } from './hello.resolvers';
import { Module } from '@nestjs/common';

@Module({
  providers: [HelloResolvers],
})
export class HelloModule {}
