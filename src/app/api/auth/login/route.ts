import { NextResponse } from 'next/server';

import { USERS } from '@/shared/mock/auth';

// Функция для генерации токена (в реальном приложении используйте JWT или другой метод)
const generateToken = (userId: number) => {
  return `token_${userId}`;
};

// Маршрут для входа
export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Проверка учетных данных
  const user = USERS.find(
    (user) => user.username === username && user.password === password,
  );

  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  // Генерация токена
  const token = generateToken(user.id);

  // Установка токена в куки
  const response = NextResponse.json({ message: 'User logged in successfully', token });

  response.cookies.set('token', token, { httpOnly: true });

  return response;
}
