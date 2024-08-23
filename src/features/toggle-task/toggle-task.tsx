import React from 'react';

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

export const ToggleTask: React.FC = ({ onChange, checked }: CheckboxProps) => (
  <Checkbox onChange={onChange} checked={checked} />
);
