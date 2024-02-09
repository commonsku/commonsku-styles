import { uniqueId } from 'lodash';
import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from 'react';
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
  country?: string | string[];
  currentLocBias?: boolean;
  delayValue?: number;
  onChange?: (v: TSelectedOption) => void;
  onInputChange?: (v: string) => void;
};

export default function AddressAutocompleteInput({
  apiKey,
  value,
  country,
  currentLocBias = false,
  delayValue = 800,
  onChange = () => {},
  onInputChange = () => {},
  ...props
}: Readonly<AddressAutocompleteInputProps>) {
  const [currentLocation, setCurrentLocation] = useState({ lat:0, lng: 0 });
  const [options, setOptions] = useState<TOption[]>([]);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);
  const [testId] = useState(uniqueId('autocomplete-search-input-'));

  useEffect(() => {
    if (typeof window === 'undefined') { return; }
    const places = window.google.maps.places;
    if (!places) { return; }
    setSessionToken(
      new places.AutocompleteSessionToken() || undefined
    );
  }, []);

  useEffect(() => {
    if (currentLocBias) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = position.coords;
          setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
        });
      }
    }
  }, [currentLocBias]);

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
    const locationBias = (currentLocation.lat || currentLocation.lng)
        ? new google.maps.Circle({
          center: currentLocation,
          radius: 1000
        }) : undefined;
    try {
      const res = await getPlacesAutocomplete({
        input: value,
        language: 'en',
        sessionToken,
        componentRestrictions: country ? { country } : undefined,
        locationBias: locationBias,
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
          data-testid={testId}
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
