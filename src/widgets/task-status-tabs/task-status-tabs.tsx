'use client'

import {ATabs} from "@/shared/ui";
import {ITEMS} from "./const";
import {useState} from "react";

export const TaskStatusTabs = () => {

    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key:string) =>{
        setActiveKey(key)
    }

    return (
        <div>
            <ATabs defaultActiveKey={activeKey} items={ITEMS} onChange={onChange}/>
        </div>
    )
}