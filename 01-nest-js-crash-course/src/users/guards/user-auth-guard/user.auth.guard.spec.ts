import { UserAuthGuard } from './user.auth.guard';

describe('UserAuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new UserAuthGuard()).toBeDefined();
  });
});
