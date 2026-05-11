import { LoginCredentials, RegisterData, UserType } from '@/types';

const MOCK_USER: UserType = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
};

/**
 * Mock login — returns a fake user on success.
 */
export async function login(
  credentials: LoginCredentials,
): Promise<UserType> {
  await new Promise((r) => setTimeout(r, 500));

  if (
    credentials.email === 'priya@example.com' &&
    credentials.password === 'password'
  ) {
    return MOCK_USER;
  }
  throw new Error('Invalid email or password');
}

/**
 * Mock register — always succeeds.
 */
export async function register(
  _data: RegisterData,
): Promise<UserType> {
  await new Promise((r) => setTimeout(r, 500));
  return { ...MOCK_USER, id: '2' };
}

/**
 * Mock logout.
 */
export async function logout(): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
}
