import ssr from './ssr';
export * from './sizes';
export { default as generateColor } from './generateColor';

export const valIsValid = (val: any) => val !== null && val !== undefined && val !== ''; // not checking for 0

export const aeval = (obj:{[key: string]: any}, key: string, def: any) => {
  return obj && obj[key] !== undefined ? obj[key] : def;
}

// (+|-)100(px|em|rem|...) => px|em|rem|...
export const getUnit = (measurement: string|number) => {
  if (typeof measurement !== "string") {
    return "px";
  }
  const matchedMeasurement = measurement.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  return matchedMeasurement ? matchedMeasurement[2] : "px";
};

export const stripUnit = (measurement: string|number) =>
  (typeof measurement === "number") ? measurement : parseFloat(measurement);
// @ts-ignore
export const parseMeasurement = (measurement: string|number) => stripUnit(measurement) + getUnit(measurement);

export const window = ssr.window;
export const document = ssr.document;