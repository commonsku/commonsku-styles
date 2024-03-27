import React, {
  CSSProperties,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input, InputProps } from "./Input";
import { CalendarIcon, XIcon } from "./icons";
import { format } from "date-fns";
import DateRangePicker, {
  DateRange,
  DateRangePickerProps,
  DateRangePreset,
} from "./DateRangePicker";
import colors from "./colors";
import styled from "styled-components";

const dropdownStyles: CSSProperties = {
  position: "absolute",
  marginTop: "1rem",
  padding: "1rem",
  background: "#fff",
  border: "2px solid",
  borderRadius: "5px",
  borderColor: "var(--color-primary1-60)",
  zIndex: 1,
};

const Indicator = styled.span<{ top?: number }>`
  position: absolute;
  top: ${({ top }) => (top ? `${top}px` : "8px")};
  right: 4px;
  cursor: pointer;
  font-style: normal;

  svg {
    width: 1.9rem;
    vertical-align: middle;
  }
`;

const formatDateRange = (
  { startDate, endDate }: DateRange,
  dateFormat: string,
) => {
  if (startDate != null && endDate != null) {
    return `${format(startDate, dateFormat)} to ${format(endDate, dateFormat)}`;
  } else if (startDate != null) {
    return `Since ${format(startDate, dateFormat)}`;
  } else if (endDate != null) {
    return `Until ${format(endDate, dateFormat)}`;
  }

  return "";
};

const getDateInputText = (
  dateRange: DateRange,
  dateFormat: string,
  presets?: DateRangePreset[],
) => {
  if (presets != null) {
    const preset = presets.find((preset) => preset.name === dateRange.category);

    if (preset) {
      return preset.label;
    }
  }

  return formatDateRange(dateRange, dateFormat);
};

export interface DateRangeInputProps extends Omit<InputProps, "onChange"> {
  isClearable: boolean;
  selected: DateRange;
  dateFormat: string;
  onInputSelect: () => void;
  onClickClear?: () => void;
}

export const DateRangeInput = ({
  value,
  error,
  noMargin,
  onClick,
  isClearable,
  selected,
  dateFormat,
  onInputSelect,
  onClickClear,
  ...props
}: DateRangeInputProps) => {
  return (
    <div style={{ position: "relative" }}>
      <Input
        readOnly
        onFocus={onInputSelect}
        value={value}
        onClick={onClick}
        noMargin={noMargin}
        error={error}
        type="text"
        autoComplete="off"
        {...props}
      />

      {!isClearable ? (
        <Indicator onClick={onClick}>
          <CalendarIcon />
        </Indicator>
      ) : (
        <Indicator top={6} onClick={onClickClear}>
          <XIcon color={colors.select.clearIcon.color} />
        </Indicator>
      )}
    </div>
  );
};

export interface DateRangeDropdownProps extends DateRangePickerProps {
  dateText?: string;
}

export const DateRangeDropdown = (props: DateRangeDropdownProps) => {
  const {
    onChange,
    presets,
    dateText,
    range,
    error,
    isClearable = false,
    dateFormat = "yyyy-MM-dd",
    placeholder,
    placeholderText,
    style = dropdownStyles,
  } = props;
  const [open, setOpen] = useState(false);
  const [defaultDateText, setDefaultDateText] = useState<string>(
    getDateInputText(range, dateFormat, presets),
  );
  const datepickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleExternalClick = (e: MouseEvent) => {
      if (
        datepickerRef.current != null &&
        !datepickerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleExternalClick);

    return () => document.removeEventListener("mousedown", handleExternalClick);
  }, []);

  const handleChange = useCallback(
    (range: DateRange, event?: SyntheticEvent<any>, closeDropdown = false) => {
      if (onChange != null) {
        onChange(range, event);
      }

      setDefaultDateText(getDateInputText(range, dateFormat, presets));
      closeDropdown && setOpen(false);
    },
    [dateFormat, onChange, presets],
  );

  const handleClickClear = useCallback(() => {
    if (onChange) {
      onChange({ startDate: null, endDate: null, category: "" });
    }
    setDefaultDateText("");
  }, [onChange]);

  return (
    <>
      <DateRangeInput
        noMargin
        value={dateText != null ? dateText : defaultDateText}
        onInputSelect={() => setOpen(true)}
        error={error}
        onClick={() => setOpen(true)}
        isClearable={isClearable}
        onClickClear={handleClickClear}
        selected={range}
        dateFormat={dateFormat}
        placeholder={placeholder || placeholderText || `Select a date range...`}
      />
      {open && (
        <DateRangePicker
          {...props}
          ref={datepickerRef}
          style={style}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default DateRangeDropdown;
