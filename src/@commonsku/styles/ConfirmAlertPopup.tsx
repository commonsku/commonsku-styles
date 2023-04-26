import React from 'react';
import { Popup } from './Popup';
import { Button } from './Button';
import { fontStyles } from './Theme';
import colors from './colors';
import { Col, Row } from './FlexboxGrid';
import { AlertIcon } from './icons';

export type ConfirmAlertPopupProps = React.PropsWithChildren<{
  padding?: string;
  maxWidth: string | number;
  title?: React.ReactNode;
  disableActionButton?: boolean;
  cancelButtonContent?: React.ReactNode;
  actionButtonContent?: React.ReactNode;
  onAction?: () => void;
  onClose?: () => void;
}>;
const ConfirmAlertPopup = (props: ConfirmAlertPopupProps) => {
  const {
    padding='16px',
    maxWidth=555,
    title='',
    children='Are you sure you want to perform this action?',
    cancelButtonContent='Cancel',
    actionButtonContent='Delete',
    disableActionButton = false,
    onAction,
    onClose,
  } = props;

  return (
    <Popup
      width={'auto'}
      height={'auto'}
      padding={padding}
      style={{ borderRadius: 10, maxWidth: maxWidth, }}
      noHeader
      noCloseButton
    >
      {title ? <PopupTitle>{title}</PopupTitle> : null}
      <PopupContent>{children}</PopupContent>
      <Row style={{ justifyContent: 'center', marginTop: 16, }}>
        <Col xs md={5.75} mdStyle={{ marginRight: 16 }}>
          <Button
            size="medium"
            variant='secondary'
            onClick={() => {
              onClose && onClose();
            }}
            style={{ width: '100%' }}
          >{cancelButtonContent}</Button>
        </Col>
        <Col xs md={5.75} xsStyle={{ marginTop: 16 }} mdStyle={{ marginTop: 0 }}>
          <Button
            size="medium"
            variant={disableActionButton ? 'disabled' : 'error'}
            onClick={() => {
              onAction && onAction();
            }}
            disabled={disableActionButton}
            style={{ width: '100%' }}
          >{actionButtonContent}</Button>
        </Col>
      </Row>
    </Popup>
  );
};

const PopupTitle = ({ children }: React.PropsWithChildren<{}>) => (
  <h2 style={{
    fontFamily: 'var(--font-family-bold)',
    fontSize: fontStyles.h2.fontSize,
    lineHeight: fontStyles.h2.lineHeight,
    color: 'var(--color-neutrals-90)',
    paddingBottom: 16,
    margin: 0,
  }}>{children}</h2>
);

const PopupContent = ({ children }: React.PropsWithChildren<{}>) => (
  <div style={{
    background: colors.errors[10],
    color: colors.errors.main,
    padding: 16,
  }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{
        paddingRight: 16,
        verticalAlign: 'middle',
        alignSelf: 'center',
      }}>
        <AlertIcon size='medium' color={colors.errors[70]} />
      </div>
      <div style={{
        fontFamily: 'var(--font-family-regular)',
        fontSize: fontStyles.p.large.fontSize,
        lineHeight: fontStyles.p.medium.lineHeight,
        color: colors.errors.main,
      }}>
        {children}
      </div>
    </div>
  </div>
);

export default ConfirmAlertPopup;
