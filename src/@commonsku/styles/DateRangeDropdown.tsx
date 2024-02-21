import React, {
  CSSProperties,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input, InputProps } from "./Input";
import { CalendarIcon } from "./icons";
import { format } from "date-fns";
import DateRangePicker, {
  DateRange,
  DateRangePickerProps,
  DateRangePreset,
} from "./DateRangePicker";

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

const inputStyles: CSSProperties = {
  fontStyle: "normal",
  cursor: "pointer",
  position: "absolute",
  top: "8px",
  right: "4px",
};

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
      <span style={inputStyles} onClick={onClick}>
        {!isClearable && (
          <CalendarIcon style={{ width: "1.9rem", verticalAlign: "middle" }} />
        )}
      </span>
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
    (range: DateRange, event?: SyntheticEvent<any>) => {
      if (onChange != null) {
        onChange(range, event);
      }

      setDefaultDateText(getDateInputText(range, dateFormat, presets));
    },
    [dateFormat, onChange, presets],
  );

  return (
    <>
      <DateRangeInput
        noMargin
        value={dateText != null ? dateText : defaultDateText}
        onInputSelect={() => setOpen(true)}
        error={error}
        isClearable={isClearable}
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
