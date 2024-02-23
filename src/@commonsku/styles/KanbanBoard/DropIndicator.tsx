import React from 'react';

type DropIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  beforeId?: string;
  column: string;
};
const DropIndicator = ({ beforeId, column, ...rest }: DropIndicatorProps) => {
  return (
    <div {...rest} data-before={beforeId || "-1"} data-column={column} style={{
      marginTop: '2px',
      marginBottom: '2px',
      height: '2px',
      width: '100%',
      background: 'var(--color-teal-40)',
      opacity: 0,
      ...rest.style
    }}></div>
  );
};

export default DropIndicator;
