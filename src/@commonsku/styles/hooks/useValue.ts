import { useState } from 'react';

const useValue = <T>(
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
