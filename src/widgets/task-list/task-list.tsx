'use client'
import {List} from "antd";


const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export const TaskList = () => <section>
    <List
        size="large"
        bordered
        dataSource={data}
        renderItem={(item, index) => <List.Item>{item  +  index}</List.Item>}
    />
</section>