'use client';

import { Spin } from 'antd';

export const Loader = () => (
  <div className='absolute right-10 top-10 z-50'>
    <Spin size='large' />
  </div>
);
