import { type HTMLAttributes } from 'react';

import { Button } from 'antd';
import { Trash } from 'lucide-react';
interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}
export const DeleteTask = (props: Props) => {
  return (
    <Button type={'primary'} danger {...props}>
      <Trash className={'h-4 w-4'} />
    </Button>
  );
};
