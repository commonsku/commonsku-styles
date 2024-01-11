import React, { ReactElement, Ref, forwardRef, useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef, CSSProperties } from 'react';
import { SKUSelectProps, Select } from './Select';
import { Row, Col, useWindowSize, getThemeColor, colors } from '@commonsku/styles';
import { ActionMeta, components, MultiValue, OnChangeValue, OptionProps, PropsValue, SelectInstance } from 'react-select'

const menuContainerStyles: CSSProperties = {
    position: 'absolute',
    width: '100%',
    top: '100%',
}

const menuStyles: CSSProperties = {
    position: 'relative',
    marginBottom: 0,
}

const subMenuStyles: CSSProperties = {
    borderTop: '1px solid',
    borderTopRightRadius: '5px',
    marginTop: 0,
}

type NestedOption<Option> = Option & {
    subOptions: Option[] | undefined
}

export interface PanelledSelectProps<
    Option, 
    IsMulti extends boolean,
> extends Omit<SKUSelectProps, 'value' | 'options' | 'onChange'> {
    value?: PropsValue<Option>
    options?: Array<NestedOption<Option>>
    onChange?: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void
}

const ParentOption = <Option,>({setFocusedOption, ...props}: {
    setFocusedOption: (hoveredValue: Option | undefined) => void
} & OptionProps<Option>) => {
    const { data: option, isFocused } = props;

    useEffect(() => {
        if (isFocused) {
            setFocusedOption(option);
        }
    }, [option, isFocused, setFocusedOption]);

    return (
        <div>
            <components.Option {...props} />
        </div>
    );
}

const PanelledSelect = <Option, IsMulti extends boolean>(
    {
        value,
        options,
        onChange,
        ...props
    }: PanelledSelectProps<Option, IsMulti>,
    ref?: Ref<SelectInstance>,
) => {
    const { error, isMulti } = props;
    const [isOpen, setOpen] = useState(false);
    const [focusedOption, setFocusedOption] = useState<NestedOption<Option> | undefined>(undefined);
    const [menuHeight, setMenuHeight] = useState(0);
    const [controlHeight, setControlHeight] = useState(0);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const controlRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowSize();

    useLayoutEffect(() => {
        if (menuRef.current != null) {
            setMenuHeight(menuRef.current.offsetHeight);
        }

        if (controlRef.current != null) {
            setControlHeight(controlRef.current.offsetHeight);
        }
    }, [windowSize, isOpen, value]);

    const hasSubOptions = useCallback((option: NestedOption<Option>) =>
        option != null && option.subOptions != null && option.subOptions.length > 0
    , []);

    const currentSubOptions = useMemo(() => {
        if (focusedOption != null && hasSubOptions(focusedOption)) {
            return focusedOption.subOptions;
        }

        return undefined;
    }, [hasSubOptions, focusedOption]);

    const onValueChange = (newValue: OnChangeValue<NestedOption<Option>, IsMulti>, actionMeta: ActionMeta<Option>) => {        
        if (onChange == null) return;
        
        if (isMulti) {
            const singleValues = (newValue as MultiValue<NestedOption<Option>>)
                .filter(opt => !hasSubOptions(opt));

            onChange(singleValues as OnChangeValue<Option, IsMulti>, actionMeta);
            return;
        }


        if (!hasSubOptions(newValue as NestedOption<Option>)) {
            onChange(newValue, actionMeta);
        }
    }

    const onSubValueChange = (newSubValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
        if (onChange == null) return;

        if (isMulti) {
            const newSubValues = Array.isArray(newSubValue)
                ? (newSubValue as MultiValue<NestedOption<Option>>)
                : [newSubValue];

            const oldValues = Array.isArray(value)
                ? value.filter(v => !newSubValues.includes(v)) as MultiValue<NestedOption<Option>>
                : [value];

            onChange([...oldValues, ...newSubValues] as OnChangeValue<Option, IsMulti>, actionMeta);
            return;
        }
        
        onChange(newSubValue, actionMeta);
        setOpen(false);
    }

    const renderParentOption = useCallback((props) => (
        <ParentOption setFocusedOption={setFocusedOption} {...props} />
    ), [setFocusedOption]);

    const renderMenu = useCallback((props) => (
        <div style={menuContainerStyles} ref={menuRef}>
            <components.Menu {...props} />
        </div>
    ), []);

    const renderControl = useCallback((props) => (
        <div ref={controlRef}>
            <components.Control {...props} />
        </div>
    ), []);

    return (
        <div>
            <Row>
                <Col>
                    <Select
                        value={value}
                        options={options}
                        onMenuOpen={() => setOpen(true)}
                        onMenuClose={() => setOpen(false)}
                        menuIsOpen={isOpen}
                        ref={ref}
                        components={{
                            Option: renderParentOption,
                            Menu: renderMenu,
                            Control: renderControl,
                        }}
                        onChange={(newValue, actionMeta) =>
                            onValueChange(newValue as OnChangeValue<NestedOption<Option>, IsMulti>, actionMeta as ActionMeta<Option>)
                        }
                        menuStyles={menuStyles}
                        {...props}
                    />
                </Col>
                <Col>
                    {currentSubOptions != null &&
                        <Select
                            value={value}
                            options={currentSubOptions}
                            menuIsOpen={isOpen}
                            components={{
                                Control: () => null
                            }}
                            onChange={(newValue, actionMeta) =>
                                onSubValueChange(newValue as OnChangeValue<Option, IsMulti>, actionMeta as ActionMeta<Option>)
                            }
                            menuStyles={{
                                ...subMenuStyles, 
                                height: menuHeight,
                                top: controlHeight,
                                borderTopColor: error
                                    ? getThemeColor(props, 'select.error.border', colors.select.error.border)
                                    : getThemeColor(props, 'select.active.border', colors.select.active.border),
                            }}
                        />
                    }
                </Col>
            </Row>
        </div>
    );
};

const ForwardedPanelledSelect = forwardRef(PanelledSelect) as <Option, IsMulti extends boolean>(
    props: PanelledSelectProps<Option, IsMulti> & { 
        ref?: Ref<SelectInstance>
    }
) => ReactElement;

export { ForwardedPanelledSelect as PanelledSelect};
