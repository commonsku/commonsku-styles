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

export const window = ssr.window;
export const document = ssr.document;

/**
 * Handle on input change number
 *
 * Example:
 * <Input
 *   value={state.toLocaleString(undefined, { maximumFractionDigits: 4 })}
 *   onChange={e => {
 *     const value = onChangeNumber(e.target.value);
 *     if (value === null) { return; }
 *     setState(value);
 *   }}
 * />
 *
 */
 export const onChangeNumber = (value?: string | number | null): (null | number | string) => {
  let val = value;
  if (val === undefined || val === null) {
      val = '';
  }
  val = val + '';
  val = val.replaceAll(',', '');
  val = val.replaceAll(' ', '');

  const dotIndex = val.indexOf('.');
  const dotLastIndex = val.lastIndexOf('.');
  // if adding float num, then allow to add '.'
  const hasLastDot = dotIndex === val.length - 1;
  const hasFirstDot = dotIndex === 0;
  if ((hasLastDot || hasFirstDot) && dotLastIndex === dotIndex) {
      if (isNaN(+(val.replace('.', '')))) {
          return null;
      }
      return val;
  }

  // if adding minus num, then allow to add '-'
  const hasFirstdash = val.indexOf('-') === 0;
  if (hasFirstdash) {
      if (isNaN(+(val.replace('-', '')))) {
          return null;
      }
      return val;
  }

  val = +val;
  if (isNaN(val)) { return null; }
  return val;
};
