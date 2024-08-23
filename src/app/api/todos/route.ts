import { type NextRequest, NextResponse } from 'next/server';

import { TODOS } from '@/shared/mock/todos';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(TODOS);
}

export async function POST(request: NextRequest) {
  const newData = await request.json();

  newData.id = TODOS.length + 1;
  TODOS.push(newData);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(newData);
}

export async function PUT(request: NextRequest) {
  const { id, title, description, checked } = await request.json();
  const index = TODOS.findIndex((item) => item.id === id);

  if (index !== -1) {
    TODOS[index].title = title;
    TODOS[index].description = description;
    TODOS[index].checked = checked;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(TODOS[index]);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const index = TODOS.findIndex((item) => item.id === id);

  if (index !== -1) {
    TODOS.splice(index, 1);
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json({ id });
}
