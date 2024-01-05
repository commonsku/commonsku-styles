import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { LabeledInput, LabeledRadio } from "../Input";
import { Col, Row } from "../FlexboxGrid";
import Loading from "../icons/Loading";
import { Typography } from "../Typography";
import {
  getAddressCityAndState as getBaseAddressCityAndState,
  getAddressPostalCodeAndCountry as getBaseAddressPostalCodeAndCountry,
} from "../AddressAutocomplete/utils";
import { ConfirmAddressContentProps, TAddress, TSelectedValue } from "./types";
import useConfirmAddress from "./useConfirmAddress";
import { AlertIcon, WarnIcon } from "../icons";
import { fontStyles } from "../Theme";


const getAddressCityAndState = (address: Partial<TAddress>) => getBaseAddressCityAndState({
  city: address.address_city,
  state: address.address_state,
});

const getAddressPostalCodeAndCountry = (address: Partial<TAddress>) => getBaseAddressPostalCodeAndCountry({
  country: address.address_country,
  postal: address.address_postal,
});

export const ConfirmAddressContent = ({
  address: initialAddress,
  mapElementId,
  templateColor,
  onClose,
  onSelect,
}: ConfirmAddressContentProps) => {
  const [address, setAddress] = useState(initialAddress);
  const [addressLine1, setAddressLine1] = useState(initialAddress.address_line_1);
  const [selectedValue, setSelectedValue] = useState<TSelectedValue>('entered');
  const borderColor = templateColor || 'var(--color-neutrals-50)';
  const {
    loading,
    recommendedAddress,
    fetchAddress,
  } = useConfirmAddress(address, true, mapElementId);

  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]);

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
          <Col xs sm={2} style={{ minHeight: '40px' }}>
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
            <Typography.Text bold fontSize={'18px'} style={{ marginBottom: '4px' }}>What you entered</Typography.Text>
            <Typography.Text noBottom>{address.address_line_1}</Typography.Text>
            <Typography.Text noBottom>{getAddressCityAndState(address)}</Typography.Text>
            <Typography.Text noBottom>{getAddressPostalCodeAndCountry(address)}</Typography.Text>
          </Col>
        </Row>
      </Col>

      {loading && <Col xs style={{ margin: 8 }}>
        <div style={{ textAlign: 'center' }}>
          <Loading />
        </div>
      </Col>}

      {!loading && !address.address_line_1 && <Col xs style={{ margin: 8 }}>
        <Row style={{
          border: '2px solid var(--color-neutrals-50)',
          borderRadius: '5px',
          padding: 14,
        }}>
          <Col xs>
            <Typography.Text bold fontSize={'18px'} style={{ marginBottom: '4px' }}>Missing information</Typography.Text>
            <LabeledInput
              required
              color={borderColor}
              error={!addressLine1}
              label="Address Line 1"
              placeholder="Type here"
              value={addressLine1}
              onChange={e => {
                const value = e.target.value;
                setAddressLine1(value);
              }}
            />
          </Col>
        </Row>
      </Col>}

      {!loading && !recommendedAddress && address.address_line_1 && <Col xs style={{ margin: 8 }}>
        <Row>
          <Col xs>
            <Typography.Text bold fontSize={'18px'} style={{ marginBottom: '4px' }}>Verification issues</Typography.Text>
            <div style={{
              background: 'var(--color-yellow-20)',
              borderRadius: '5px',
              padding: 14,
            }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', textAlign: 'center' }}>
                <div style={{
                  paddingRight: 16,
                  verticalAlign: 'middle',
                  alignSelf: 'start',
                }}>
                  <WarnIcon size='large' color={'var(--color-yellow-90)'} />
                </div>
                <Typography.Text bold
                  fontSize={fontStyles.p.large.fontSize}
                  lineHeight={fontStyles.p.medium.lineHeight}
                  color={'var(--color-yellow-90)'}
                >
                  Address not found
                </Typography.Text>
              </div>
              </div>
          </Col>
        </Row>
      </Col>}

      <Col xs style={{ margin: 8, ...(loading || !recommendedAddress ? { display: 'none' } : {}), }}>
        <Row style={{
          border: `2px solid ${selectedValue !== 'recommended' ? 'var(--color-neutrals-50)' : borderColor}`,
          borderRadius: '5px',
          padding: 14,
        }}>
          {!loading && recommendedAddress && <>
            <Col xs sm={2} style={{ minHeight: '40px' }}>
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
              <Typography.Text bold fontSize={'18px'} style={{ marginBottom: '4px' }}>Recommended</Typography.Text>
              {loading ? <div style={{ textAlign: 'center' }}>
                  <Loading />
              </div> : <>
                <Typography.Text noBottom>{recommendedAddress?.address_line_1 || ''}</Typography.Text>
                <Typography.Text noBottom>{getAddressCityAndState(recommendedAddress || {})}</Typography.Text>
                <Typography.Text noBottom>{getAddressPostalCodeAndCountry(recommendedAddress || {})}</Typography.Text>
              </>}
            </Col>
          </>}
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

      <Col xs style={{ textAlign: 'right', margin: 8 }}>
        <Button variant="secondary"
          xsStyle={{ marginRight: 8 }}
          onClick={onClose}
        >{!loading && !recommendedAddress && address.address_line_1 ? 'Use Entered' : 'Back'}</Button>
        <Button variant="primary"
          onClick={() => {
            if (!loading && !recommendedAddress && address.address_line_1) {
              onClose();
              return;
            }

            if (!loading && !recommendedAddress && !address.address_line_1) {
              if (!addressLine1) {
                return;
              }
              const newAddress = { ...address, address_line_1: addressLine1 };
              setAddress?.(newAddress);
              fetchAddress(newAddress);
              return;
            }
            const newAddress = selectedValue === 'recommended' ? {
              ...(recommendedAddress || {}),
              address_line_1: recommendedAddress?.address_line_1 || '',
              address_line_2: '',
              address_line_3: '',
            } : address;
            onSelect?.(newAddress || {});
            onClose();
          }}
        >{!loading && !recommendedAddress && address.address_line_1 ? 'Make Changes' : 'Continue'}</Button>
      </Col>
    </Row>
  );
};
