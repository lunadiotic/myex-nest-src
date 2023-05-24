import { UsersService } from '../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => {
        return Promise.resolve([]);
      },
      create: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const user = await service.register('Test', 'a@b.com', 'test');
    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user already exists', async () => {
    fakeUsersService.find = () => {
      return Promise.resolve([
        { id: 1, name: 'Test', email: 'a@b.com', password: 'test' } as User,
      ]);
    };
    await expect(service.register('Test', 'a@b.com', 'test')).rejects.toThrow(
      'User already exists',
    );
  });
});
