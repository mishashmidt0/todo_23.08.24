'use client'

import { Spin } from 'antd';

export const Loader = () => (
         <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-xl flex justify-center items-center z-50">
            <Spin size="large" />
        </div>
);


