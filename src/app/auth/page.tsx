'use client';

import React, { useState } from 'react';

import { Tabs } from 'antd';
import { Toaster } from 'react-hot-toast';

import { LoginForm } from '@/features/login-form/login-form';
import { RegisterForm } from '@/features/register-form/register-form';

const ITEMS = [
  {
    key: 'login',
    label: 'Вход',
  },
  {
    key: 'registers',
    label: 'Регистрация',
  },
];

export default function Home() {
  const [activeKey, setActiveKey] = useState('login');
  const handleChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <main className='flex min-h-screen flex-col items-center gap-10 p-24'>
      <Tabs defaultActiveKey={activeKey} items={ITEMS} onChange={handleChange} />
      {activeKey === 'login' ? <LoginForm /> : <RegisterForm />}
      <Toaster />
    </main>
  );
}
