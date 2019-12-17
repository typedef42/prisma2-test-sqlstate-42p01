import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';

import { MakersModule } from '../makers.module';

describe('Maker Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MakersModule,
        GraphQLModule.forRoot({
          installSubscriptionHandlers: true,
          autoSchemaFile: './src/schema.gql',
          debug: false,
          playground: false,
          context: ({ req }) => ({ req }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When calling MUTATION', () => {
    const maker = {
      name: 'John',
      username: 'john42',
      followers: 0,
      location: 'Aix-en-Provence',
    };

    let id = '';

    const createMakerInput = JSON.stringify(maker).replace(/\"([^(\")"]+)\":/g, '$1:');

    const createMakerQuery = `
    mutation {
      createMaker(newMakerData: ${createMakerInput}) {
        id
        name
        username
        followers
        location
      }
    }`;

    it('createMaker: Should return a valid Maker', async () => {
      const result = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: createMakerQuery,
        })
        .expect(({ body }) => {
          const data = body.data.createMaker;
          id = data.id;
          expect(data.title).toBe(maker.name);
          expect(data.username).toBe(maker.username);
          expect(data.followers).toBe(maker.followers);
          expect(data.location).toBe(maker.location);
        })
        .expect(200);
    });
  });
});
