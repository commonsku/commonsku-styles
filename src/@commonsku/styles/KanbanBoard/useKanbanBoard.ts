import { useEffect, useState } from 'react';
import { TCard } from './types';

export type useKanbanBoardProps<T extends TCard = TCard> = {
  cards: T[];
  onAddCard?: (c: Omit<T, 'id'>) => T | Promise<T>;
  onRemoveCard?: (id: string) => void | boolean | Promise<void | boolean>;
  updateCards?: (cards: T[]) => void;
};

export function useKanbanBoard<T extends TCard = TCard>({
  cards: initialCards,
  onAddCard,
  onRemoveCard,
  updateCards,
}: useKanbanBoardProps<T>) {
  const [cards, setCards] = useState<T[]>(initialCards);

  useEffect(() => {
    updateCards?.(cards);
  }, [cards, updateCards]);

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
    setCards,
    handleAddCard,
    handleRemoveCard,
  };
};
