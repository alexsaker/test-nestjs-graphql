import { Hello } from './../graphql';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Hello')
export class HelloResolvers {
  @Query()
  hello(@Args('name') name: string): Hello {
    return { text: `Hello ${name}` };
  }
  @Mutation('saveName')
  saveName(@Args('name') name: string): Hello {
    const myHello = { text: `Just saved ${name}` };
    pubSub.publish('helloGranted', { helloGranted: myHello });
    return myHello;
  }
  @Subscription('helloGranted')
  helloGranted(@Args('filter') filter: string) {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator('helloGranted'),
        (payload, variables) => {
          console.log('##PAYLOAD', payload, '##VARIABLES', variables);
          return payload.helloGranted.text.indexOf(variables.filter) > 0;
        },
      ),
    };
  }
}
