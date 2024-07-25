export const valIsValid = (val: any) => val !== null && val !== undefined && val !== ''; // not checking for 0

export const aeval = (obj:{[key: string]: any}, key: string, def: any) => {
    return obj && obj[key] ? obj[key] : def;
}

export function isClientSide() {
  return Boolean(typeof window !== 'undefined' && window.document);
}

export function toArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x];
}
