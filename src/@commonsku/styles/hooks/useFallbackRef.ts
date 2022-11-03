import { ForwardedRef, useImperativeHandle, useRef, MutableRefObject } from 'react';

const useFallbackRef = <T>(forwardedRef: ForwardedRef<T>): MutableRefObject<T | null> => {
  const localRef = useRef<T>(null);
  useImperativeHandle<T | null, T | null>(forwardedRef, () => localRef.current);
  return localRef;
};

export default useFallbackRef;