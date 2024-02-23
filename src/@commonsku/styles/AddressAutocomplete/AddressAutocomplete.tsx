import React, { Children, useCallback, useRef, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { ActionMeta, SingleValue } from 'react-select';
import { debounce } from 'lodash';
import { getPlacesAutocomplete, geocodePlaceDetails, parseAddressComponents, ParsedAddress } from "./utils";
import { AsyncSelect, components, } from '../Select';
import { useDebounceCallback } from 'usehooks-ts';

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
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken>();
  if (!sessionToken.current && window?.google?.maps?.places) {
    sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
  }

  const handleChangeFn = useCallback((option: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => {
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
  }, [onChange]);

  const handleDebouncedChange = useDebounceCallback(handleChangeFn, delayValue);

  const loadOptions = debounce(async (value: string, callback: (options: readonly TOption[]) => void) => {
    let data: TOption[] = [];
    try {
      const res = await getPlacesAutocomplete({
        input: value,
        language: 'en',
        sessionToken: sessionToken.current,
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
          onChange={handleDebouncedChange}
          value={value}
          loadOptions={loadOptions}
          containerStyles={containerStyles}
          placeholder="Search address..."
          components={{
            MenuList: ({ children, ...rest }) => {
              return (
                <components.MenuList {...rest}>
                  {children}
                  {Children.count(children) > 0 && options.length > 0 && <MenuListFooter />}
                </components.MenuList>
              );
            },
          }}
        />
      </div>
    </Wrapper>
  );
}
