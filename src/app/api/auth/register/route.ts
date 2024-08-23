import { NextResponse } from 'next/server';

import { USERS } from '@/shared/mock/auth';

// Функция для генерации токена (в реальном приложении используйте JWT или другой метод)
const generateToken = (userId: number) => {
  return `token_${userId}`;
};

// Маршрут для регистрации
export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Проверка, существует ли пользователь
  const existingUser = USERS.find((user) => user.username === username);

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Создание нового пользователя
  const newUser = { id: USERS.length + 1, username, password };

  USERS.push(newUser);

  // Генерация токена
  const token = generateToken(newUser.id);

  // Установка токена в куки
  const response = NextResponse.json({ message: 'User registered successfully', token });

  response.cookies.set('token', token, { httpOnly: true });

  return response;
}
