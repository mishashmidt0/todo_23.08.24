'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ITEMS } from './const';

import type { RootState } from '@/shared/store';
import { setFilter } from '@/shared/store/filter-task-slice';
import { ATabs } from '@/shared/ui';

export const TaskStatusTabs = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.filter);
  const onChange = (key: string) => {
    dispatch(setFilter(key));
  };

  return (
    <div>
      <ATabs defaultActiveKey={filter} items={ITEMS} onChange={onChange} />
    </div>
  );
};
