import { ReactNode } from 'react';

export type TColumn = {
  column: string;
  title?: ReactNode;
  color?: string;
};

export type TCard = {
  id: string;
  title: ReactNode;
  column: string;
};
