import { assign } from 'lodash';
import { useRef, useEffect, MutableRefObject } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  props: {
    ref: MutableRefObject<T|null>, 
    eventType?: 'mousedown' | 'mouseup',
    onClick?: (e?: any) => void,
    onCleanup?: Function,
  }
) => {
  const { ref, eventType = 'mousedown', onClick, onCleanup } = props;
  const effectRef = useRef<any>({});
  assign(effectRef.current, { eventType, onCleanup, ref, onClick });
  
  useEffect(() => {
    const { eventType, onCleanup, ref, onClick } = effectRef.current;
    function handleClickOutside(this: Document, e: MouseEvent): any {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClick && onClick(e);
      }
    };

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
      onCleanup && onCleanup();
    };
  }, []);
};

export default useClickOutside;