import { useCallback, useEffect, useState } from "react";
import { document } from "../../utils";
import {
  geocodePlaceDetails,
  getPlacesAutocomplete,
  parseAddressComponents,
  getAddressCityAndState,
  getAddressPostalCodeAndCountry,
} from "../AddressAutocomplete/utils";
import { TAddress } from "./types";

const useConfirmAddress = (address: TAddress, addMap = false, mapElementId: string = '') => {
  const [loading, setLoading] = useState(false);
  const [recommendedAddress, setRecommendedAddress] = useState<TAddress | null>(null);

  const addMapElement = useCallback((details: google.maps.GeocoderResult) => {
    const mapElem = document.getElementById(mapElementId);
    if(mapElem) {
      mapElem.style.display = 'block';
    }

    try {
      const Lat = details.geometry.location.lat();
      const Lng = details.geometry.location.lng();
      const myOptions: google.maps.MapOptions = {
        zoom: 11,
        center: new window.google.maps.LatLng(Lat, Lng),
        fullscreenControl: false,
        streetViewControl: false,
        scaleControl: false,
        rotateControl: false,
        panControl: false,
        mapTypeControl: false,
        zoomControl: false,
      };
      if (!mapElem) { return; }
      const map = new window.google.maps.Map(mapElem, myOptions);
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(Lat, Lng),
        map: map,
        title: '',
      });
    } catch (error) {
      console.log(error);
      if (mapElem) {
        mapElem.style.display = 'none';
      }
    }
  }, [mapElementId]);

  const fetchAddress = useCallback((address: TAddress) => {
    setLoading(true);
    const mapElem = document.getElementById(mapElementId);
    if (mapElem) {
      mapElem.style.display = 'none';
    }
    const places = window.google.maps.places;
    if (!places) {
      setLoading(false);
      return;
    }
    const sessionToken = new places.AutocompleteSessionToken();
    let value = address.address_line_1 || '';
        value += ', ' + getAddressCityAndState({ city: address.address_city, state: address.address_state });
        value += ' ' + getAddressPostalCodeAndCountry({ country: address.address_country, postal: address.address_postal });
    getPlacesAutocomplete({ input: value, language: 'en', sessionToken }).then(res => {
      if (res?.length === 0 || !res?.[0]?.place_id) {
        setLoading(false);
        setRecommendedAddress(null);
        return;
      }
      geocodePlaceDetails(res[0].place_id).then(details => {
        setLoading(false);
        if (!details) {
          setRecommendedAddress(null);
          return;
        }
        setRecommendedAddress(parseAddressComponents(details.address_components));

        addMap && addMapElement(details);
      }).catch(() => {
        setLoading(false);
        setRecommendedAddress(null);
      })
    }).catch(() => {
      setLoading(false);
      setRecommendedAddress(null);
    });
  }, [addMap, addMapElement, mapElementId]);

  useEffect(() => {
    if (typeof window === 'undefined') { return; }
    setLoading(true);
    setTimeout(() => {
      fetchAddress(address);
    }, 1500);
  }, [fetchAddress, address]);

  return {
    loading,
    recommendedAddress,
    fetchAddress,
  };
};

export default useConfirmAddress;
