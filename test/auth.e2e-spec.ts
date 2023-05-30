import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'sakata',
        email: 'kintoki6@mail.com',
        password: 'test',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body).toMatchObject({
          id: expect.any(Number),
          name: 'sakata',
          email: 'kintoki6@mail.com',
        });
      });
  });
});
