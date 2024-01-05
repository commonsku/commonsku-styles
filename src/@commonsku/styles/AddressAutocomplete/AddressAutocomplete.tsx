import React, { useEffect, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { ActionMeta, SingleValue } from 'react-select';
import { debounce } from 'lodash';
import { getPlacesAutocomplete, geocodePlaceDetails, parseAddressComponents, ParsedAddress } from "./utils";
import { AsyncSelect, components, } from '../Select';

const MenuListFooter = () => (
  <center>
    Powered by <img
                src={'https://developers.google.com/static/maps/documentation/images/google_on_white.png'}
                style={{ paddingLeft: 8, maxWidth: 60 }}
              />
  </center>
);

type TOption = {
  value: string;
  label: string;
  terms: google.maps.places.PredictionTerm[];
};
type TSelectedOption = TOption & {
  address_components: google.maps.GeocoderAddressComponent[],
  formatted_address: string,
  parsed_address: ParsedAddress,
};
type AddressAutocompleteProps = {
  apiKey: string,
  value?: TOption,
  delayValue?: number;
  onChange?: (v: TSelectedOption) => void;
  onInputChange?: (v: string) => void;
  requestOptions?: Omit<google.maps.places.AutocompletionRequest, "input">;
  containerStyles?: React.CSSProperties,
};

export default function AddressAutocomplete({
  apiKey,
  value,
  delayValue = 800,
  onChange = () => {},
  onInputChange = () => {},
  containerStyles = {},
}: AddressAutocompleteProps) {
  const [options, setOptions] = useState<TOption[]>([]);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') { return; }
    const places = window.google.maps.places;
    if (!places) { return; }
    setSessionToken(
      new places.AutocompleteSessionToken() || undefined
    );
  }, []);

  const handleChangeFn = (option: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => {
    const value = option?.value || '';
    geocodePlaceDetails(value).then(res => {
      if (!res || !option) {
        return;
      }

      onChange?.({
        ...option,
        address_components: res.address_components,
        formatted_address: res.formatted_address,
        parsed_address: parseAddressComponents(res.address_components),
      });
    });
  };

  const handleChange = debounce(handleChangeFn, delayValue);

  const loadOptions = debounce(async (value: string, callback: (options: readonly TOption[]) => void) => {
    let data: TOption[] = [];
    try {
      const res = await getPlacesAutocomplete({
        input: value,
        language: 'en',
        sessionToken
      }) || [];
      data = res.map(v => ({
        label: v.description,
        value: v.place_id,
        terms: v.terms,
      }));
    } catch (error) {
      console.log(error);
    }

    onInputChange?.(value);
    setOptions(data);
    callback(data);
    return data;
  }, 800);

  return (
    <Wrapper apiKey={apiKey} libraries={['core', 'maps', 'places', 'geocoding']}>
      <div className="autocomplete-search">
        <AsyncSelect
          options={options}
          onChange={handleChange}
          value={value}
          loadOptions={loadOptions}
          containerStyles={containerStyles}
          placeholder="Search address..."
          components={{
            MenuList: ({ children, ...rest }) => {
              const Children = !Array.isArray(children) ? [children] : children;
              return (
                <components.MenuList {...rest}>
                  {children}
                  {Children.length && options.length > 0 && <MenuListFooter />}
                </components.MenuList>
              );
            },
          }}
        />
      </div>
    </Wrapper>
  );
}
