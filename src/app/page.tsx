'use client';

import { Toaster } from 'react-hot-toast';

import { useGetTodosQuery } from '@/shared/api/todos-api';
import { Loader } from '@/shared/ui';
import { TaskList, TaskStatusTabs } from '@/widgets';
import { DetailsTaskModal } from '@/widgets/details-task-modal/details-task-modal';
import { NewTaskModal } from '@/widgets/new-task-modal/new-task-modal';

export default function Home() {
  const { isFetching, isError, error, isSuccess } = useGetTodosQuery();

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (!isSuccess && !isFetching) {
    return <div>Something went wrong</div>;
  }

  return (
    <main className='flex min-h-screen flex-col items-center gap-10 p-24'>
      {isFetching && <Loader />}
      <TaskStatusTabs />
      <TaskList />

      {/* MODALS */}
      <NewTaskModal />
      <DetailsTaskModal />
      <Toaster />
    </main>
  );
}
