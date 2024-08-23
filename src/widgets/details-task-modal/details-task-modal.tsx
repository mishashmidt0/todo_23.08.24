import React from 'react';

import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateTodoMutation } from '@/shared/api/todos-api';
import { type RootState } from '@/shared/store';
import { closeModal } from '@/shared/store/modal-slice';
import { type ITask } from '@/shared/types/tasks';

interface FormValues {
  id: number;
  title: string;
  description: string;
  checked: boolean;
}

export const DetailsTaskModal: React.FC = () => {
  const dispatch = useDispatch();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const { name, state } = useSelector((state: RootState) => state.modal);
  const isOpen = name === 'DetailsTaskModal';
  const task = state?.task as ITask;

  const { control, handleSubmit, reset } = useForm<FormValues>({
    values: {
      id: task?.id,
      title: task?.title,
      description: task?.description,
      checked: task?.checked,
    },
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await updateTodo(data);
      handleClose();
      reset();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <Modal
      title={`Задача: ${task?.title}`}
      open={isOpen}
      onCancel={handleClose}
      footer={null}
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item label='Заголовок' name='title'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => <Input {...field} disabled={isLoading} />}
          />
        </Form.Item>
        <Form.Item label='Описание' name='description'>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <Input.TextArea {...field} disabled={isLoading} />}
          />
        </Form.Item>
        <Form.Item label='Выполнена' name='checked'>
          <Controller
            name='checked'
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} disabled={isLoading} />
            )}
          />
        </Form.Item>
        <div className={'flex items-center justify-around'}>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button
            type='primary'
            htmlType='submit'
            disabled={isLoading}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
