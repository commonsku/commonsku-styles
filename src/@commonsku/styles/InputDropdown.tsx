import React, { useEffect, useRef, useState, } from 'react';
import styled from 'styled-components';
import Csku from './Csku';
import DebouncedInput, { DebouncedInputProps } from './DebouncedInput';

const Wrapper = styled.div`
  position: relative;
  padding-top: 20vh;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

const SearchWrapper = styled(Csku)`
&&& {
  width: 100%;
  border: none;
  display: flex;
  padding: 0;
  align-items: center;
}
`;

const OptionWrapper = styled.div`
&&& {
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
}
`;

const OptionsList = styled.div`
&&& {
  position: absolute;
  z-index: 1;
  margin-top: 70px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px #ddd;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}
`;


type DropdownOptionProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
};
const DropdownOption = ({
  label,
  value,
  ...props
}: DropdownOptionProps) => {
  return (
    <OptionWrapper {...props}>
      {label}
    </OptionWrapper>
  );
};


type TBaseInputDropdownOption = {
  label: string;
  value: string;
};
type TInputDropdownOption<T extends TBaseInputDropdownOption = TBaseInputDropdownOption> = T;
export type InputDropdownProps<
  L extends boolean = false,
  T extends TBaseInputDropdownOption = TBaseInputDropdownOption
> = Omit<DebouncedInputProps<L>, 'options' | 'labeled'> & {
  options: T[];
  onSelectOption?: (v: TInputDropdownOption<T>) => void;
  extraOptions?: React.ReactNode;
  isOpen?: boolean;
};
const ForwardedInputDropdown = <
  L extends boolean = false,
  T extends TBaseInputDropdownOption = TBaseInputDropdownOption
>(
  {
    options,
    label,
    children,
    extraOptions,
    onSelectOption,
    onChange,
    isOpen,
    value: initialValue = '',
    ...rest
  }: Omit<InputDropdownProps<L, T>, 'ref'>,
  ref?: React.ForwardedRef<HTMLInputElement>
) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(isOpen || false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    function handleClick(e: Event) {
      if (!e.target || rootRef.current?.contains(e.target as Node)) {
        return;
      }
      setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isOpen !== undefined) {
      setShowDropdown(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (options.length > 0) {
      setShowDropdown(true);
    }
  }, [options]);

  return (
    <Wrapper ref={rootRef}>
      <SearchWrapper>
        <DebouncedInput
          {...rest}
          ref={ref}
          label={label}
          labeled={Boolean(label)}
          value={value}
          wrapperProps={{ style: { width: '100%', } }}
          onChange={v => {
            setValue(v);
            onChange?.(v);
          }}
        />
      </SearchWrapper>
      {!showDropdown ? null : <OptionsList>
        {options.map(op => (
          <DropdownOption
            label={op.label}
            value={op.value}
            key={`option-${op.value}`}
            onClick={() => onSelectOption?.(op)}
          />
        ))}
        {extraOptions}
      </OptionsList>}
      {children}
    </Wrapper>
  );
};

const InputDropdown = React.forwardRef(ForwardedInputDropdown) as <
  L extends boolean = false,
  T extends TBaseInputDropdownOption = TBaseInputDropdownOption
>(
  props: InputDropdownProps<L, T>
) => ReturnType<typeof ForwardedInputDropdown>;

export default InputDropdown;