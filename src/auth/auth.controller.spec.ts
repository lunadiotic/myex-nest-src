import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      // register: (email: string, password: string) => {},
      login: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user on login', async () => {
    const session = { userId: -10 };
    const user = await controller.login(
      { email: 'email', password: 'password' },
      session,
    );
    expect(user).toEqual({ id: 1, email: 'email', password: 'password' });
    expect(session['userId']).toEqual(1);
  });
});
