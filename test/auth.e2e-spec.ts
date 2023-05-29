import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it('handles register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'sakata',
        email: 'kintoki5@mail.com',
        password: 'test',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body).toMatchObject({
          id: expect.any(Number),
          name: 'sakata',
          email: 'kintoki5@mail.com',
        });
      });
  });
});
