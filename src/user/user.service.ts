import { Injectable, Inject } from '@nestjs/common';
import { Database } from 'arangojs';
import { UserBasic, UserCollectionResult, UserInput } from 'src/graphql';

@Injectable()
export class UserService {
  constructor(
    @Inject('ArangoDbConnection') private readonly connection: Database,
  ) {}
  async findAll(): Promise<UserCollectionResult[]> {
    const query = `
    return {
        metadata:{
            length:LENGTH(users)
        },
        result: (FOR u in users 
                 LET userRoles = (FOR userRoleId in u.roles 
                                    FOR r in roles FILTER r._id == userRoleId 
                                    return {id:r._rev,name:r.name}
                                )
                return {id:u._rev,
                name:u.name,
                email:u.email,
                roles:userRoles}
                )
    }
`;
    try {
      const cursor = await this.connection.query(query);
      return await cursor.all();
    } catch (error) {
      throw error;
    }
  }

  async saveUser(user: UserInput): Promise<UserBasic> {
    const query = `
   INSERT {
       name:@name,
       age:@age,
       email:@email,
       roles:@roles
   } in users
   RETURN {
       id:NEW._rev,
       name:NEW.name,
       age:NEW.age,
       email:NEW.email,
       roles:NEW.roles
   }
`;
    try {
      const cursor = await this.connection.query(query, {
        name: user.name,
        age: user.age,
        email: user.email,
        roles: user.roles,
      });
      return await cursor.all();
    } catch (error) {
      throw error;
    }
  }
}
