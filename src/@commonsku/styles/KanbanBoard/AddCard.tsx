import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, } from '../Button';
import { AddIcon, } from '../icons';
import { Textarea } from '../Textarea';
import { TCard } from './types';

const StyledTextarea = styled(Textarea)`
width: 100%;
border-radius: 4px;
border-width: 1px;
border-color: var(--color-teal-40);
background: var(--color-teal-20);
font-size: 14px;
line-height: 20px;
color: var(--color-neutrals-30);
&:focus {
  outline-width: 0px;
}
`;

export type AddCardProps<T extends TCard = TCard> = {
  column: string;
  onAddCard?: (c: Omit<T, 'id'>) => void;
};
function AddCard<T extends TCard = TCard>({ column, onAddCard }: AddCardProps<T>) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim().length) return;
    onAddCard?.({ column, title: text.trim() } as Omit<T, 'id'>);
    setAdding(false);
  };

  return (
    <>
      {adding ? <form onSubmit={handleSubmit}>
        <StyledTextarea
          onChange={e => setText(e.target.value)}
          autoFocus
          placeholder='Add new task...'
        />
        <div style={{
          marginTop: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'end',
          gap: '6px',
        }}>
          <Button
            onClick={() => setAdding(false)}
            variant='custom'
            variantBg='transparent'
            variantBorderColor='transparent'
            variantColor='var(--color-neutrals-10)'
            variantHoverColor='var(--color-neutrals-50)'
            variantHoverBg='transparent'
            variantHoverBorderColor='transparent'
            style={{
              padding: '6px 9px',
              fontSize: '12px',
              lineHeight: '16px',
              color: 'var(--color-neutrals-40)',
              transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms',
            }}
          >Close</Button>
          <Button
            type='submit'
            onClick={() => setAdding(false)}
            variant='custom'
            variantBg='transparent'
            variantBorderColor='transparent'
            variantColor='var(--color-neutrals-10)'
            variantHoverColor='var(--color-neutrals-50)'
            variantHoverBg='transparent'
            variantHoverBorderColor='transparent'
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              borderRadius: '4px',
              padding: '6px 9px',
              fontSize: '12px',
              lineHeight: '16px',
              color: 'var(--color-neutrals-10)',
              transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms',
            }}
          >
            <span>Add</span>
            <AddIcon color="var(--color-neutrals-20)" />
          </Button>
        </div>
      </form> : <Button
        onClick={() => setAdding(true)}
        variant='custom'
        variantBg='transparent'
        variantBorderColor='transparent'
        variantColor='var(--color-neutrals-10)'
        variantHoverColor='var(--color-neutrals-50)'
        variantHoverBg='transparent'
        variantHoverBorderColor='transparent'
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          padding: '6px 13px',
          fontSize: '12px',
          lineHeight: '16px',
          color: 'var(--color-neutrals-10)',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
        }}
      >
        <span>Add card</span>
        <AddIcon color="var(--color-neutrals-10)" />
      </Button>}
    </>
  );
};

export default AddCard;
