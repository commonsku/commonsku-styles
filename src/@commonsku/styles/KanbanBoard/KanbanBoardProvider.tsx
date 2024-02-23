import React, { createContext, useContext } from 'react';
import { TCard } from './types';
import { useKanbanBoard, useKanbanBoardProps } from './useKanbanBoard';

type Props<T extends TCard = TCard> = useKanbanBoardProps<T>;
type KanbanBoardProviderProps<T extends TCard = TCard> = React.PropsWithChildren<Props<T>>;

const kanbanBoardContext = createContext<Props>({
  cards: [],
});

function KanbanBoardProvider<T extends TCard = TCard>({
  children,
  cards: initialCards,
  columns: boardColumns,
  onAddCard,
  onRemoveCard,
  updateCards,
}: KanbanBoardProviderProps<T>) {
  const value = useKanbanBoard({
    cards: initialCards,
    columns: boardColumns,
    onAddCard,
    onRemoveCard,
    updateCards,
  });

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
