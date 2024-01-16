import React, { useEffect, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { getPlacesAutocomplete, geocodePlaceDetails, parseAddressComponents, ParsedAddress } from "./utils";
import InputDropdown, { InputDropdownProps } from '../InputDropdown';

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
type AddressAutocompleteInputProps = InputDropdownProps<true, TOption> & {
  apiKey: string;
  value?: string;
  delayValue?: number;
  onChange?: (v: TSelectedOption) => void;
  onInputChange?: (v: string) => void;
};

export default function AddressAutocompleteInput({
  apiKey,
  value,
  delayValue = 800,
  onChange = () => {},
  onInputChange = () => {},
  ...props
}: Readonly<AddressAutocompleteInputProps>) {
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

  const handleChange = (option: TOption) => {
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
      setOptions([]);
    });
  };

  const loadOptions = async (value: string) => {
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
    return data;
  };

  return (
    <Wrapper apiKey={apiKey} libraries={['core', 'maps', 'places', 'geocoding']}>
      <div className="autocomplete-search">
        <InputDropdown
          {...props}
          options={options}
          onChange={loadOptions}
          onSelectOption={handleChange}
          value={value}
          timeout={delayValue}
          isOpen={options.length > 0}
          extraOptions={(
            <center>
              Powered by <img
                src="https://developers.google.com/static/maps/documentation/images/google_on_white.png"
                style={{ paddingLeft: 8, maxWidth: 60 }}
              />
            </center>
          )}
        />
      </div>
    </Wrapper>
  );
}
