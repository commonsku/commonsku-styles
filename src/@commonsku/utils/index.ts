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

export const window = ssr.window;
export const document = ssr.document;