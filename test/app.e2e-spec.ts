import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { debug as Debug } from 'debug';

const debug = Debug('issue:e2e');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    debug('app init done ...');
  });

  it('/ (GET)', async () => {
    debug('start to run /');
    const result = await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');

    debug('finished to run /');
    return result;
  });

  it('/issues (GET)', async () => {
    debug('start to run /issues');
    const result = await request(app.getHttpServer())
      .get('/issues')
      .expect(200)
      .expect('issues');

    debug('finished to run /issues');
    return result;
  });

  afterEach(async () => {
    // debug('start to close app @after.each');
    await app.close();
    // await moduleFixture.close();
    // debug('done with close app @after.each');
  });
});
