import { document } from "../../utils";

type PlacesAutocompleteReq = google.maps.places.AutocompletionRequest;
type PlacesAutocompleteReturn = Promise<google.maps.places.AutocompletePrediction[] | null>;

type GeoArgs = google.maps.GeocoderRequest;
type GeocodeResult = google.maps.GeocoderResult;
type GeoReturn = Promise<GeocodeResult[] | null>;

export type ParsedAddress = {
  street_number: string,
  route: string,
  address_line_1: string,
  address_line_2: string,
  address_line_3: string,
  address_city: string,
  address_country: string,
  address_state: string,
  address_postal: string,
};

export const getPlacesAutocomplete = (args: PlacesAutocompleteReq): PlacesAutocompleteReturn => {
  let service: google.maps.places.AutocompleteService;
  try {
    service = new window.google.maps.places.AutocompleteService();
  } catch (error) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    service.getPlacePredictions(args, (results, status) => {
      if (status !== "OK") {
        return reject(status);
      }
      if (!results) {
        return resolve([]);
      }
      return resolve(results);
    });
  });
};

export const getGeocode = (args: GeoArgs): GeoReturn => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(args, (results, status) => {
      if (status !== "OK") {
        return reject(status);
      }
      return resolve(results);
    });
  });
};

export type LatLng = { lat: number; lng: number };

export const getLatLng = (result: GeocodeResult): LatLng => {
  const { lat, lng } = result.geometry.location;
  return { lat: lat(), lng: lng() };
};

type ZipCode = string | undefined;

export const getZipCode = (
  result: GeocodeResult,
  useShortName: false
): ZipCode => {
  const foundZip = result.address_components.find(({ types }) =>
    types.includes("postal_code")
  );

  if (!foundZip) return undefined;

  return useShortName ? foundZip.short_name : foundZip.long_name;
};

type GetDetailsArgs = google.maps.places.PlaceDetailsRequest;

type DetailsResult = Promise<google.maps.places.PlaceResult | null>;

export const getPlaceDetails = (args: GetDetailsArgs): DetailsResult => {
  const PlacesService = new window.google.maps.places.PlacesService(
    document.createElement("div") as HTMLDivElement
  );

  if (!args.placeId) {
    console.error('invalid place id', args.placeId);
    return Promise.reject('Invalid Place Id');
  }

  return new Promise((resolve, reject) => {
    PlacesService.getDetails(args, (results, status) => {
      if (status !== "OK") reject(status);
      resolve(results);
    });
  });
};

export const geocodePlaceDetails = (placeId: string): Promise<GeocodeResult | null> => {
  const service = new window.google.maps.Geocoder();

  if (!placeId) {
    console.error('invalid place id', placeId);
    return Promise.reject('Invalid Place Id');
  }

  return new Promise((resolve, reject) => {
    service.geocode({ placeId }, (results, status) => {
      if (status !== "OK") {
        return reject(status);
      }

      return resolve(results?.[0] || null);
    });
  });
};

export const parseAddressComponents = (address_components: google.maps.GeocoderAddressComponent[]): ParsedAddress => {
  const street_number = address_components.find(v => v.types.includes('street_number'))?.long_name || '';
  const route = address_components.find(v => v.types.includes('route'))?.long_name || '';
  const city = address_components.find(v => (v.types.includes('political') && v.types.includes('locality')))?.long_name || '';
  const prov = address_components.find(v => v.types.includes('administrative_area_level_1'))?.short_name || '';
  const country = address_components.find(v => v.types.includes('country'))?.long_name || '';
  const postal = address_components.find(v => v.types.includes('postal_code'))?.long_name || '';
  const subpremise = address_components.find(v => v.types.includes('subpremise'))?.long_name || '';

  return {
    street_number,
    route,
    address_line_1: `${street_number} ${route}`.trim(),
    address_line_2: subpremise.trim(),
    address_line_3: '',
    address_city: city,
    address_country: country,
    address_state: prov,
    address_postal: postal,
  };
};


export function getAddressCityAndState(address: { city?: string, state?: string, }) {
  const city = (address?.city || '').trim();
  const state = (address?.state || '').trim();
  return [city + (city ? ', ' : ''), state].join(' ').trim();
}

export function getAddressPostalCodeAndCountry(address: { postal?: string; country?: string }) {
  const postal = (address?.postal || '').trim();
  const country = (address?.country || '').trim();
  return [postal + (postal ? ', ' : ''), country].join(' ').trim();
}

