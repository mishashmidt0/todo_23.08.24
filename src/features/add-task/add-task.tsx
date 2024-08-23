import { Button } from 'antd';
import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const AddTask = ({ onClick }: Props) => {
  return (
    <Button type='primary' className={'w-full'} onClick={onClick}>
      <Plus />
    </Button>
  );
};
