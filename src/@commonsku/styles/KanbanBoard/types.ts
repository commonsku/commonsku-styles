export type TColumn = {
  column: string;
  title?: string;
  color?: string;
};

export type TCard = {
  id: string;
  title: React.ReactNode;
  column: string;
};
