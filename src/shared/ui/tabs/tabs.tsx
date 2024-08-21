'use client'

import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface IItems {
    label: string
    children: string
    key: string
}

interface Props {
    onChange: (key: string)=>void;
    items: IItems[];
    defaultActiveKey:string;
}
export const ATabs: React.FC = ({onChange,items,defaultActiveKey}:Props) => <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />;

