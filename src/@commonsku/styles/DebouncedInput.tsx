import React, { useCallback, useEffect } from 'react';
import { useDebounceCallback } from 'usehooks-ts'
import { Input, InputProps, LabeledInput, LabeledInputProps } from './Input';

export type DebouncedInputProps<L extends boolean = false> = Omit<
  L extends true ? LabeledInputProps : InputProps,
  'label' | 'timeout' | 'labeled' | 'onChange' | 'ref'
> & {
  label?: React.ReactNode,
  timeout?: number;
  labeled?: L | false;
  onChange: (v: string) => void;
  ref?: React.ForwardedRef<HTMLInputElement>
};
const ForwardedDebouncedInput = <L extends boolean = false>(
  {
    value,
    label,
    onChange,
    timeout = 1000,
    labeled = false,
    ...rest
  }: Omit<DebouncedInputProps<L>, 'ref'>,
  ref?: React.ForwardedRef<HTMLInputElement>
) => {
  const [state, setState] = React.useState(value);

  const handleChange = useCallback(
    (value: string) => onChange?.(value),
    [onChange]
  );
  const debounced = useDebounceCallback(handleChange, 500);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setState(value);
    debounced(value);
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  if (labeled) {
    return <LabeledInput ref={ref} value={state} onChange={onChangeHandler} label={label || ''} {...rest} />;
  }
  return <Input ref={ref} value={state} onChange={onChangeHandler} {...rest} />;
};

const DebouncedInput = React.forwardRef(ForwardedDebouncedInput) as <L extends boolean = false>(
  props: DebouncedInputProps<L>
) => ReturnType<typeof ForwardedDebouncedInput>;

export default DebouncedInput;
