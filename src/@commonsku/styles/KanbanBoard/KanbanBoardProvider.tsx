import React, { createContext, useContext, useMemo } from 'react';
import { TCard, TColumn } from './types';
import { useKanbanBoard, useKanbanBoardProps } from './useKanbanBoard';

type Props<
  T extends TCard = TCard,
  C extends TColumn = TColumn
> = useKanbanBoardProps<T> & { columns: C[]; };
type KanbanBoardProviderProps<
  T extends TCard = TCard,
  C extends TColumn = TColumn
> = React.PropsWithChildren<Props<T, C>>;

const kanbanBoardContext = createContext<Props>({
  cards: [],
  columns: [],
});

function KanbanBoardProvider<
  T extends TCard = TCard,
  C extends TColumn = TColumn
>({
  children,
  cards: initialCards,
  columns,
  onAddCard,
  onRemoveCard,
  updateCards,
}: KanbanBoardProviderProps<T, C>) {
  const initialValue = useKanbanBoard({
    cards: initialCards,
    onAddCard,
    onRemoveCard,
    updateCards,
  });
  const value = useMemo(
    () => ({ ...initialValue, columns }),
    [initialValue, columns]
  );

  return (
    <kanbanBoardContext.Provider value={value}>
      {children}
    </kanbanBoardContext.Provider>
  );
};

export function useCartContext<T extends TCard = TCard>() {
  const value = useContext<Props<T>>(
    kanbanBoardContext as unknown as React.Context<Props<T>>
  );
  return value;
};

export default KanbanBoardProvider;
