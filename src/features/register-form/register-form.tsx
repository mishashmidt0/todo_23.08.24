'use client';

import React from 'react';

import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useRegisterMutation } from '@/shared/api/auth-api';

interface FormValues {
  username: string;
  password: string;
}

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>();
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data);
      toast.success('Successfully!');
      router.push('/');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={'flex flex-col'}>
      <Form.Item label='Username' name='username'>
        <Controller
          name='username'
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Controller
          name='password'
          control={control}
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>
      <Form.Item className={'mx-auto'}>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
