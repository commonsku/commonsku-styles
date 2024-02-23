import React, { useState } from 'react';
import styled from 'styled-components';
import { BotIcon, TrashIcon } from '../icons';

const FireIcon = styled(BotIcon)`
animation: bounce 1s infinite;

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
`;

export type RemoveColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  onRemoveCard: (id: string) => void;
};
function RemoveColumn({ onRemoveCard, ...rest }: RemoveColumnProps) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    console.log(cardId);
    onRemoveCard?.(cardId);
    setActive(false);
  };

  return (
    <div
      {...rest}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        marginTop: '40px',
        display: 'grid',
        height: '224px',
        width: '224px',
        flexShrink: 0,
        placeContent: 'center',
        borderRadius: '4px',
        borderWidth: '1px',
        fontSize: '30px',
        lineHeight: '36px',
        borderColor: active ? 'var(--color-errors-80)' : 'var(--color-neutrals-50)',
        background: active ? 'var(--color-errors-40)' : 'var(--color-neutrals-80)',
        color: active ? 'var(--color-errors-50)' : 'var(--color-neutrals-50)',
        ...rest.style
      }}>
      {active ? <FireIcon /> : <TrashIcon />}
    </div>
  );
};

export default RemoveColumn;
