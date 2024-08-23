import React from 'react';

import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateTodoMutation } from '@/shared/api/todos-api';
import { type RootState } from '@/shared/store';
import { closeModal } from '@/shared/store/modal-slice';

interface FormValues {
  title: string;
  description: string;
  checked: boolean;
}

export const NewTaskModal: React.FC = () => {
  const dispatch = useDispatch();
  const [createTodo, { isLoading: loadingCreate }] = useCreateTodoMutation();
  const { name } = useSelector((state: RootState) => state.modal);
  const isOpen = name === 'NewTaskModal';

  const { control, handleSubmit, reset } = useForm<FormValues>();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await createTodo(data);
      toast.success('Successfully!');
      handleClose();
      reset();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <Modal title='Добавить задачу' open={isOpen} onCancel={handleClose} footer={null}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item label='Заголовок' name='title'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label='Описание' name='description'>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>
        <Form.Item label='Выполнена' name='checked'>
          <Controller
            name='checked'
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loadingCreate}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
