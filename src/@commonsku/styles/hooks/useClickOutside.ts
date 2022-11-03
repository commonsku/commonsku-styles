import { useEffect, MutableRefObject } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  props: {
    ref: MutableRefObject<T|null>, 
    eventType?: 'mousedown' | 'mouseup',
    onClick?: (e?: any) => void,
    onCleanup?: Function,
  }
) => {
  const { ref, eventType = 'mousedown', onClick, onCleanup } = props;
  useEffect(() => {
    function handleClickOutside(this: Document, e: MouseEvent): any {
      console.log('handleClickOutside');
      if (ref.current && !ref.current.contains(e.target as Node)) {
        console.log('click outside');
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