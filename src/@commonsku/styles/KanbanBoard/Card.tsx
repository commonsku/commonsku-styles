import React from 'react';
import styled from 'styled-components';
import DropIndicator from './DropIndicator';
import { TCard } from './types';

const CardWrapper = styled.div({
  cursor: 'grab',
  borderRadius: '4px',
  borderWidth: '1px',
  borderColor: 'var(--color-neutrals-70)',
  background: 'var(--color-neutrals-60)',
  padding: '12px',
  ':active': {
    cursor: 'grab',
  },
});

type CardProps<T extends TCard = TCard> = T & {
  handleDragStart: (e: React.DragEvent<HTMLElement>, cardId: string) => void;
};
function Card<T extends TCard = TCard>({ id, title, column, handleDragStart, ...rest }: CardProps<T>) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <CardWrapper
        draggable="true"
        onDragStart={e => handleDragStart(e, id)}
      >
        <p style={{
          fontSize: '14px',
          lineHeight: '20px',
          color: 'var(--color-neutrals-10)',
        }}>{title}</p>
      </CardWrapper>
    </>
  );
};

export default Card;
