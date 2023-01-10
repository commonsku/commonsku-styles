import React from 'react';
import { Popup } from './Popup';
import { Button } from './Button';
import { fontStyles } from './Theme';
import colors from './colors';

export type ConfirmPopupProps = {
  disableDelete?: boolean;
  confirmText?: string;
  onDelete?: () => void;
  onClose?: () => void;
};

const ConfirmPopup = React.forwardRef<HTMLDivElement, ConfirmPopupProps>((
  props: ConfirmPopupProps, ref) => {
  const {
    confirmText='Are you sure you want to delete?',
    disableDelete = false,
    onDelete,
    onClose,
  } = props;

  return (
    <Popup
      ref={ref}
      width={'auto'}
      height={'auto'}
      padding={'36px'}
      noHeader
      noCloseButton
    >
      <p style={{
        fontFamily: fontStyles.p.medium.fontFamily,
        fontSize: fontStyles.p.medium.fontSize,
        lineHeight: fontStyles.p.medium.lineHeight,
        color: colors.neutrals.bodyText
      }}>{confirmText}</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          size="medium"
          variant='secondary'
          mr={24}
          onClick={() => {
            onClose && onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          variant={disableDelete ? 'disabled' : 'error'}
          onClick={() => {
            onDelete && onDelete();
          }}
          disabled={disableDelete}
        >
          Delete
        </Button>
      </div>
    </Popup>
  );
});

export default ConfirmPopup;
