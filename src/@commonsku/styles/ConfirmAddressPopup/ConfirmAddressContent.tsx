import React, { useState } from "react";
import { Button } from "../Button";
import { LabeledRadio } from "../Input";
import { Col, Row } from "../FlexboxGrid";
import Loading from "../icons/Loading";
import { Typography } from "../Typography";
import {
  getAddressCityAndState as getBaseAddressCityAndState,
  getAddressPostalCodeAndCountry as getBaseAddressPostalCodeAndCountry,
} from "../AddressAutocomplete/utils";
import { ConfirmAddressContentProps, TAddress, TSelectedValue } from "./types";
import useConfirmAddress from "./useConfirmAddress";


const getAddressCityAndState = (address: Partial<TAddress>) => getBaseAddressCityAndState({
  city: address.address_city,
  state: address.address_state,
});

const getAddressPostalCodeAndCountry = (address: Partial<TAddress>) => getBaseAddressPostalCodeAndCountry({
  country: address.address_country,
  postal: address.address_postal,
});

export const ConfirmAddressContent = ({
  address,
  mapElementId,
  templateColor,
  onClose,
  onSelect,
}: ConfirmAddressContentProps) => {
  const {
    loading,
    recommendedAddress,
  } = useConfirmAddress(address, true, mapElementId);
  const [selectedValue, setSelectedValue] = useState<TSelectedValue>('entered');
  const borderColor = templateColor || 'var(--color-neutrals-50)';

  return (
    <Row>
      <Col xs>
        <Typography.H2 noBottom>Confirm your address</Typography.H2>
        <Typography.Text>Review the recommended charges</Typography.Text>
      </Col>

      <Col xs style={{ margin: 8 }}>
        <Row style={{
          border: `2px solid ${selectedValue !== 'entered' ? 'var(--color-neutrals-50)' : borderColor}`,
          borderRadius: '5px',
          padding: 14,
        }}>
          <Col xs sm={2}>
            <LabeledRadio
              name="entered-checkbox"
              label=""
              checked={selectedValue === 'entered'}
              onChange={(e) => {
                e?.preventDefault?.();
                setSelectedValue('entered')
              }}
            />
          </Col>
          <Col xs sm={10}>
            <Typography.H5>What you entered</Typography.H5>
            <Typography.Text noBottom>{address.address_line_1}</Typography.Text>
            <Typography.Text noBottom>{getAddressCityAndState(address)}</Typography.Text>
            <Typography.Text noBottom>{getAddressPostalCodeAndCountry(address)}</Typography.Text>
          </Col>
        </Row>
      </Col>

      <Col xs style={{ margin: 8 }}>
        <Row style={{
          border: `2px solid ${selectedValue !== 'recommended' ? 'var(--color-neutrals-50)' : borderColor}`,
          borderRadius: '5px',
          padding: 14,
        }}>
          <Col xs sm={2}>
            <LabeledRadio
              name="recommended-checkbox"
              label=""
              checked={selectedValue === 'recommended'}
              onChange={(e) => {
                e?.preventDefault?.();
                setSelectedValue(recommendedAddress ? 'recommended' : 'entered');
              }}
            />
          </Col>
          <Col xs sm={10}>
            <Typography.H5>Recommended</Typography.H5>
            {loading ? <div style={{ textAlign: 'center' }}>
                <Loading />
            </div> : <>
              <Typography.Text noBottom>{recommendedAddress?.address_line_1 || ''}</Typography.Text>
              <Typography.Text noBottom>{getAddressCityAndState(recommendedAddress || {})}</Typography.Text>
              <Typography.Text noBottom>{getAddressPostalCodeAndCountry(recommendedAddress || {})}</Typography.Text>
            </>}
          </Col>
          <Col xs style={{ marginTop: 20, }}>
            <div id={mapElementId} style={{
              position: 'relative',
              width: '100%',
              height: '260px',
              borderRadius: 5,
              boxShadow: '1px 1px 3px 1px #c1c1c1',
            }}></div>
          </Col>
        </Row>
      </Col>
      <Col xs style={{ textAlign: 'center', margin: 8 }}>
        <Button variant="secondary"
          smStyle={{ marginRight: 8 }}
          onClick={onClose}
        >Back</Button>
        <Button variant="primary"
          onClick={() => {
            const newAddress = selectedValue === 'recommended' ? {
              ...(recommendedAddress || {}),
              address_line_1: recommendedAddress?.address_line_1 || '',
              address_line_2: '',
              address_line_3: '',
            } : address;
            onSelect?.(newAddress || {});
            onClose();
          }}
        >Continue</Button>
      </Col>
    </Row>
  );
};
