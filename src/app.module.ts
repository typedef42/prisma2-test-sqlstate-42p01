import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { MakersModule } from './makers/makers.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: './src/schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req })
    }),
    MakersModule
  ]
})
export class AppModule {}
