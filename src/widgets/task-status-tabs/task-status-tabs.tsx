'use client';

import React from 'react';

import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ITEMS } from './const';

import type { RootState } from '@/shared/store';
import { type FilterName, setFilter } from '@/shared/store/filter-task-slice';

export const TaskStatusTabs = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.filter);

  const onChange = (key: string) => {
    const filterKey = key as FilterName;

    dispatch(setFilter(filterKey));
  };

  return (
    <div>
      <Tabs defaultActiveKey={filter} items={ITEMS} onChange={onChange} />
    </div>
  );
};
