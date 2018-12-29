import { Module } from '@nestjs/common';
import { Database } from 'arangojs';
const ConnectionProvider = {
  provide: 'ArangoDbConnection',
  useFactory: async () => {
    const dbConn = await new Database({
      url: 'http://192.168.99.100:8529',
    }).useBasicAuth('root', 'SzshRK0zNvrarWNM');
    dbConn.useDatabase('graphql');
    return dbConn;
  },
};

@Module({
  providers: [ConnectionProvider],
  exports: [ConnectionProvider],
})
export class DatabaseModule {}
