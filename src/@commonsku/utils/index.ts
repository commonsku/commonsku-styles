import ssr from './ssr';
export * from './sizes';
export { default as generateColor } from './generateColor';

export const valIsValid = (val: any) => val !== null && val !== undefined && val !== ''; // not checking for 0

export const aeval = (obj:{[key: string]: any}, key: string, def: any) => {
    return obj && obj[key] ? obj[key] : def;
}

export const truncate = (value: string, length: number) => {
    if(typeof value !== 'string') {
      return value
    }
    if(value.length < length) {
      return value
    }
  
    return `${value.slice(0, length)}...`
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const range = (start: number, end?: number, step: number = 1) => {
  let output = [] as number[];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

// (+|-)100(px|em|rem|...) => px|em|rem|...
export const getUnit = (measurement: string|number, def: string = 'px') => {
  if (typeof measurement !== "string") {
    return def;
  }
  const matchedMeasurement = measurement.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  return matchedMeasurement ? matchedMeasurement[2] : def;
};

export const stripUnit = (measurement: string|number) =>
  (typeof measurement === "number") ? measurement : parseFloat(measurement);

export const parseMeasurement = (measurement: string|number, def: string = 'px') =>
  stripUnit(measurement) + getUnit(measurement, def);

export const window = ssr.window;
export const document = ssr.document;
