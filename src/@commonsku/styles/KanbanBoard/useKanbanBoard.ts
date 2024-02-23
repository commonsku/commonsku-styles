import { useEffect, useMemo, useState } from 'react';
import { TCard, TColumn } from './types';

export type useKanbanBoardProps<T extends TCard = TCard> = {
  cards: T[];
  columns?: TColumn[];
  onAddCard?: (c: Omit<T, 'id'>) => T | Promise<T>;
  onRemoveCard?: (id: string) => void | boolean | Promise<void | boolean>;
  updateCards?: (cards: T[]) => void;
};

export function useKanbanBoard<T extends TCard = TCard>({
  cards: initialCards,
  columns: boardColumns,
  onAddCard,
  onRemoveCard,
  updateCards,
}: useKanbanBoardProps<T>) {
  const [cards, setCards] = useState<T[]>(initialCards);

  useEffect(() => {
    updateCards?.(cards);
  }, [cards, updateCards]);

  const columns = useMemo(
    () => {
      if (boardColumns) {
        return boardColumns;
      }
      return Array.from(new Set(cards.map(c => c.column)).keys()).map(
        c => ({
          column: c,
          title: c.slice(0, 1).toUpperCase() + c.slice(1),
          color: 'var(--color-neutrals-10)'
        })
      );
    },
    [boardColumns, cards]
  );

  const handleAddCard = (v: Omit<T, 'id'>) => {
    if (!onAddCard) return;
    Promise.resolve(
      onAddCard(v)
    ).then(newCard => {
      if (!newCard || !newCard.id) { return; }
      setCards(s => ([...s, newCard]));
    });
  };

  const handleRemoveCard = (id: string) => {
    if (!onRemoveCard) return;
    Promise.resolve(
      onRemoveCard(id)
    ).then((res) => {
      if (typeof res !== 'boolean' || (typeof res === 'boolean' && res)) {
        setCards(s => s.filter(c => c.id !== id));
      }
    });
  };

  return {
    cards,
    columns,
    setCards,
    handleAddCard,
    handleRemoveCard,
  };
};
