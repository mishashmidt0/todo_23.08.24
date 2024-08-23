'use client';

import React from 'react';

import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useLoginMutation } from '@/shared/api/auth-api';

interface FormValues {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      toast.success('Successfully!');
      router.push('/');
    } catch (error) {
      console.error('Failed to login:', error);
      toast.error(error);
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={'flex flex-col'}>
      <Typography className={'mb-4'}>
        username: <b>user1</b>, password: <b>password1</b>
      </Typography>

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
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
