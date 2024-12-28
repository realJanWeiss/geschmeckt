import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { GetUser } from './user.decorator';

jest.mock('@nestjs/common', () => ({
  createParamDecorator: (fn: any) => fn,
}));

describe('GetUser Decorator', () => {
  it('should return the user from the request object', () => {
    const mockRequest = {
      user: {
        id: '123123123',
        name: 'Max Tester',
        email: 'test@test.com',
      } as UserResponseDTO,
    };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const result = GetUser(null, mockContext);

    expect(result).toStrictEqual(mockRequest.user);
  });
});
