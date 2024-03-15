import React, { useMemo, useState } from 'react';
import { AddCardProps } from './AddCard';
import Card from './Card';
import DropIndicator from './DropIndicator';
import { TCard } from './types';

export type ColumnProps<T extends TCard = TCard> = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: React.ReactNode;
  headingColor?: string;
  column: string;
  cards: Array<T>;
  setCards: React.Dispatch<React.SetStateAction<T[]>>;
  onMoveCard?:(c: T, beforeId: string) => void | Promise<T>;
  onAddCard?:(c: Omit<T, 'id'>) => void;
  AddCard?: ({ column, onAddCard }: AddCardProps<T>) => JSX.Element;
};
function Column<T extends TCard = TCard>({
  title,
  column,
  cards,
  headingColor = 'var(--color-neutrals-10)',
  setCards,
  onMoveCard,
  onAddCard,
  AddCard,
  ...rest
}: ColumnProps<T>) {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLElement>, cardId: string) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: React.DragEvent<HTMLElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll<HTMLElement>(`
    [data-column="${column}"]`));
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach(i => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e: React.DragEvent<HTMLElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length-1]
      }
    );
    return el;
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";
    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find(c => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter(c => c.id !== cardId);
      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex(el => el.id === before);
        if (insertAtIndex === -1) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      if (onMoveCard) {
        Promise.resolve(onMoveCard(cardToTransfer, before)).then((res) => {
          if (typeof res !== 'boolean' || (typeof res === 'boolean' && res)) {
            setCards(copy);
          }
        });
      } else {
        setCards(copy);
      }
    }
  };

  const filteredCards = useMemo(
    () => cards.filter(c => c.column === column),
    [cards, column]
  );

  return (
    <div {...rest} style={{width: '224px', flexShrink: 0, ...rest.style}}>
      <div style={{
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ margin: 0, fontWeight: 500, color: headingColor }}>{title}</h3>
        <span style={{
          borderRadius: '4px',
          fontSize: '14px',
          lineHeight: '20px',
          color: 'var(--color-neutrals-40)'
        }}>{filteredCards.length}</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        style={{
          height: '100%',
          width: '100%',
          paddingLeft: '4px',
          paddingRight: '4px',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          background: `var(--color-neutrals-${active ? '20' : '80'})`,
          overflowY: 'auto',
        }}
      >
        {filteredCards.map(
          c => <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        )}
        <DropIndicator beforeId={"-1"} column={column} />
        {AddCard ? <AddCard column={column} onAddCard={onAddCard} /> : null}
      </div>
    </div>
  );
};

export default Column;
