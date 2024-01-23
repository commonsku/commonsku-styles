import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { Input, InputProps, LabeledInput, LabeledInputProps } from './Input';

export type DebouncedInputProps<L extends boolean = false> = Omit<
  L extends true ? LabeledInputProps : InputProps,
  'label' | 'timeout' | 'labeled' | 'onChange' | 'ref'
> & {
  label?: string,
  timeout?: number;
  labeled?: L | false;
  onChange?: (v: string) => void;
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

  const debouncedChange = debounce((value: string) => {
    onChange?.(value);
  }, timeout);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
    const value = e.target.value;
    setState(value);
    debouncedChange(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

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