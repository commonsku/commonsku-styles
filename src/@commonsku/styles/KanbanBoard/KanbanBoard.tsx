import React from 'react';
import { RemoveColumnProps } from './RemoveColumn';
import Column, { ColumnProps } from './Column';
import { TCard, TColumn } from './types';
import { useKanbanBoard, useKanbanBoardProps } from './useKanbanBoard';

type KanbanBoardProps<T extends TCard = TCard> = React.HTMLAttributes<HTMLDivElement>
  & useKanbanBoardProps<T>
  & {
    AddCard?: ColumnProps<T>['AddCard'];
    RemoveColumn?: (props: RemoveColumnProps) => JSX.Element;
  };

function KanbanBoard<T extends TCard = TCard>({
  cards: initialCards,
  columns: boardColumns,

  AddCard,
  RemoveColumn,

  onAddCard,
  onRemoveCard,
  updateCards,
  ...rest
}: KanbanBoardProps<T>) {
  const {
    cards,
    columns,
    setCards,
    handleAddCard,
    handleRemoveCard,
  } = useKanbanBoard({
    cards: initialCards,
    columns: boardColumns,
    onAddCard,
    onRemoveCard,
    updateCards,
  });

  return (
    <div {...rest} style={{
      height: '100%',
      width: '100%',
      background: 'var(--color-neutrals-90)',
      color: 'var(--color-neutrals-50)',
      ...rest.style
    }}>
      <div style={{
        boxSizing: 'border-box',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '12px',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '48px',
      }}>
        {columns.map(c => (
          <Column
            key={`column-${c.column}`}
            title={c.title ?? (c.column.slice(0, 1).toUpperCase() + c.column.slice(1))}
            column={c.column}
            headingColor={c.color || 'var(--color-neutrals-10)'}
            cards={cards}
            setCards={setCards}
            AddCard={AddCard}
            onAddCard={handleAddCard}
          />
        ))}
        {RemoveColumn ? <RemoveColumn onRemoveCard={handleRemoveCard} /> : null}
      </div>
    </div>
  );
};

export default KanbanBoard;
