import { Button } from 'antd';
import { Trash } from 'lucide-react';

export const DeleteTask = (props: any) => {
  return (
    <Button type={'primary'} danger {...props}>
      <Trash className={'h-4 w-4'} />
    </Button>
  );
};
