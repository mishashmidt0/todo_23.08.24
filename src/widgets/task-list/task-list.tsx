'use client';

import React, { useMemo } from 'react';

import { Checkbox, List, Typography } from 'antd';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { AddTask, DeleteTask } from '@/features';
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '@/shared/api/todos-api';
import type { RootState } from '@/shared/store';
import { openModal } from '@/shared/store/modal-slice';
import { type ITask } from '@/shared/types/tasks';
import { Loader } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

export const TaskList = () => {
  const { filter } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const { data } = useGetTodosQuery();
  const [deleteTodo, { isLoading: loadingDelete }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: loadingUpdate }] = useUpdateTodoMutation();
  const isLoading = loadingDelete || loadingUpdate;
  const filteredData = useMemo(() => {
    return data?.filter((item: ITask) => {
      if (filter === 'all') {
        return true;
      }
      if (filter === 'done') {
        return !item.checked;
      }
      if (filter === 'undone') {
        return item.checked;
      }

      return false;
    });
  }, [data, filter]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteTodo(id);
      toast.success('Successfully!');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleUpdate = async (item: ITask) => {
    try {
      await updateTodo(item);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDetails = (task: ITask) => {
    dispatch(openModal({ name: 'DetailsTaskModal', state: { task } }));
  };

  const handleAddTask = () => {
    dispatch(openModal({ name: 'NewTaskModal' }));
  };

  return (
    <section className={'flex w-full flex-col gap-4'}>
      {isLoading && <Loader />}
      <List
        size='large'
        bordered
        dataSource={filteredData}
        renderItem={(item: ITask) => (
          <List.Item
            className={cn(
              'flex cursor-pointer items-center justify-between gap-4 transition-shadow duration-500 hover:shadow-xl',
              item.checked && 'opacity-60',
            )}
            onClick={(event) => {
              // Prevent click on checkbox
              if (
                (event.target as HTMLElement).tagName === 'INPUT' &&
                (event.target as HTMLInputElement).type === 'checkbox'
              ) {
                return;
              }
              handleDetails(item);
            }}
          >
            <Typography
              className={cn('mr-10 grow font-bold', item.checked && 'line-through')}
            >
              {item.title}
            </Typography>

            <div className={'space-x-8'}>
              <Checkbox
                disabled={isLoading}
                checked={item.checked}
                onChange={(e) => {
                  void handleUpdate({ ...item, checked: e.target.checked });
                }}
              />

              <DeleteTask
                disabled={isLoading}
                onClick={(e: React.MouseEvent) => {
                  void handleDelete(e, item.id);
                }}
              />
            </div>
          </List.Item>
        )}
      />

      <AddTask onClick={handleAddTask} />
    </section>
  );
};
