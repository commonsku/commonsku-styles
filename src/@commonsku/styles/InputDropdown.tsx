import React, { useEffect, useRef, useState, } from 'react';
import styled, { CSSProperties } from 'styled-components';
import Csku from './Csku';
import DebouncedInput, { DebouncedInputProps } from './DebouncedInput';

const Wrapper = styled.div`
  position: relative;
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
  margin-top: 40px;
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
  style?: CSSProperties,
};
type TInputDropdownOption<T extends TBaseInputDropdownOption = TBaseInputDropdownOption> = T;
export type InputDropdownProps<
  L extends boolean = false,
  T extends TBaseInputDropdownOption = TBaseInputDropdownOption
> = Omit<DebouncedInputProps<L>, 'options' | 'labeled'> & {
  options: T[];
  onSelectOption?: (v: TInputDropdownOption<T>) => void;
  extraOptions?: React.ReactNode;
  showDropdown?: boolean;
  setShowDropdown: (v: boolean) => void,
  wrapperStyle?: CSSProperties;
  searchWrapperStyle?: CSSProperties;
  optionsListStyle?: CSSProperties;
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
    showDropdown,
    setShowDropdown,
    value = '',
    wrapperStyle = {},
    searchWrapperStyle = {},
    optionsListStyle = {},
    ...rest
  }: Omit<InputDropdownProps<L, T>, 'ref'>,
  ref?: React.ForwardedRef<HTMLInputElement>
) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [keyOptionIdx, setKeyOptionIdx] = useState(-1);

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (options.length === 0) {
      return;
    }

    const key = e.key;
    if (key === 'ArrowDown') {
      setKeyOptionIdx(
        s => s >= options.length-1 ? 0 : s+1
      );
    } else if (key === 'ArrowUp') {
      setKeyOptionIdx(
        s => s <= 0 ? options.length-1 : s-1
      );
    } else if (key === 'Enter') {
      if (keyOptionIdx >= 0 && keyOptionIdx <= options.length) {
        onSelectOption?.(options[keyOptionIdx]);
      } else {
        setShowDropdown(false);
      }
      setKeyOptionIdx(-1);
    } else if (key === 'Tab') {
      setShowDropdown(false);
      setKeyOptionIdx(-1);
    }
  }

  return (
    <Wrapper ref={rootRef} style={wrapperStyle}>
      <SearchWrapper style={searchWrapperStyle}>
        <DebouncedInput
          autoComplete="off"
          {...rest}
          ref={ref}
          label={label}
          labeled={Boolean(label)}
          value={value}
          wrapperProps={{ style: { width: '100%', } }}
          onChange={v => {
            setKeyOptionIdx(-1);
            onChange?.(v);
          }}
          onClick={(e) => { e.currentTarget.readOnly = false; }}
          onFocus={(e) => { e.currentTarget.readOnly = false; }}
          onKeyDown={onKeyDown}
        />
      </SearchWrapper>
      {showDropdown ? <OptionsList style={optionsListStyle}>
        {options.map((op, i) => (
          <DropdownOption
            label={op.label}
            value={op.value}
            style={{
              ...(keyOptionIdx === i ? {
                backgroundColor: '#efefef',
              } : {}),
              ...op.style
            }}
            key={`option-${op.value}`}
            onClick={() => onSelectOption?.(op)}
            onMouseOver={() => setKeyOptionIdx(i)}
          />
        ))}
        {extraOptions}
      </OptionsList> : null}
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
