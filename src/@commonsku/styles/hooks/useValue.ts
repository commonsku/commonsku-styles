import { useState } from 'react';

type TAllowedValue = string | number | readonly string[] | undefined;
const useValue = <T extends TAllowedValue = string>(
  initialValue: T
): ([T, React.Dispatch<React.SetStateAction<T>>]) => {
  const [previousInitialValue, setPreviousInitialValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  if (initialValue !== previousInitialValue) {
    setPreviousInitialValue(initialValue);
    setValue(initialValue);
    return [initialValue, setValue];
  }

  return [value, setValue];
}


export default useValue;
