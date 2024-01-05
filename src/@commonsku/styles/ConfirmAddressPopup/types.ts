export type TAddress = {
  address_line_1: string,
  address_line_2?: string,
  address_line_3?: string,
  address_city?: string,
  address_postal?: string,
  address_state?: string,
  address_country?: string,
};
export type TSelectedValue = 'entered' | 'recommended';

export type ConfirmAddressContentProps = {
  address: TAddress,
  templateColor?: string,
  mapElementId?: string,
  onClose: () => void,
  onSelect?: (address?: TAddress) => void,
};

export type ConfirmAddressPopupProps = ConfirmAddressContentProps & { apiKey: string };
