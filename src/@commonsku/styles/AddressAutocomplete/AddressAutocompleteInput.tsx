import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { getPlacesAutocomplete, geocodePlaceDetails, parseAddressComponents, ParsedAddress, LatLng } from "./utils";
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
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [options, setOptions] = useState<TOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(options.length > 0);

  const testId = useId();
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken>();
  if (!sessionToken.current && window?.google?.maps?.places) {
    sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
  }

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

  const handleChange = useCallback((option: TOption) => {
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
      setShowDropdown(false);
    });
  }, [onChange]);

  const loadOptions = useCallback(async (value: string) => {
    let data: TOption[] = [];
    const locationBias = currentLocation
        ? new google.maps.Circle({
          center: currentLocation,
          radius: 1000
        }) : undefined;
    try {
      const res = await getPlacesAutocomplete({
        input: value,
        language: 'en',
        sessionToken: sessionToken.current,
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
    setShowDropdown(data.length > 0);
  }, [country, currentLocation, onInputChange]);

  const Input = useCallback(() => (
    <div className="autocomplete-search">
      <InputDropdown
        {...props}
        options={options}
        onChange={loadOptions}
        onSelectOption={handleChange}
        value={value}
        timeout={delayValue}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        data-testid={'autocomplete-search-input-' + testId}
        extraOptions={(
          <center>
            Powered by <img
              alt='Google'
              src="https://developers.google.com/static/maps/documentation/images/google_on_white.png"
              style={{ paddingLeft: 8, maxWidth: 60 }}
            />
          </center>
        )}
      />
    </div>
  ), [
    props,
    options,
    value,
    delayValue,
    showDropdown,
    testId,
    setShowDropdown,
    handleChange,
    loadOptions,
  ]);

  return (
    <Wrapper apiKey={apiKey}
      libraries={['core', 'maps', 'places', 'geocoding']}
      render={Input}
    />
  );
}
