import React, { ReactElement, Ref, forwardRef, useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef, CSSProperties } from 'react';
import { SKUSelectProps, Select } from './Select';
import { Row, Col, useWindowSize, getThemeColor, colors } from '@commonsku/styles';
import { ActionMeta, components, OptionProps, SelectInstance } from 'react-select'

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

export interface PanelledSelectProps<Option> extends Omit<SKUSelectProps, 'value' | 'options' | 'onChange'> {
    value?: NestedOption<Option>
    subValue?: Option
    options?: Array<NestedOption<Option>>
    onChange?: (
        newValue: NestedOption<Option> | undefined,
        newSubValue: Option | undefined,
        actionMeta: ActionMeta<Option>
    ) => void
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

const PanelledSelect = <Option,>(
    {
        value,
        subValue,
        options,
        onChange,
        error,
        ...props
    }: PanelledSelectProps<Option>,
    ref?: Ref<SelectInstance>,
) => {
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
    }, [windowSize, isOpen]);

    const hasSubOptions = useCallback((option: NestedOption<Option> | undefined) =>
        option != null && option.subOptions != null && option.subOptions.length > 0
    , []);

    const currentSubOptions = useMemo(() => {
        if (focusedOption != null && hasSubOptions(focusedOption)) {
            return focusedOption.subOptions;
        }

        return undefined;
    }, [hasSubOptions, focusedOption]);

    const onValueChange = (newValue: NestedOption<Option>, actionMeta: ActionMeta<Option>) => {
        if (!hasSubOptions(newValue)) {    
            setOpen(false);

            if (onChange != null) {
                onChange(newValue, undefined, actionMeta);
            }
        }
    }

    const onSubValueChange = (newSubValue: Option, actionMeta: ActionMeta<Option>) => {
        if (onChange != null) {
            onChange(focusedOption, newSubValue, actionMeta);
        }
        setOpen(false);
    }

    const renderParentOption = (props) => (
        <ParentOption setFocusedOption={setFocusedOption} {...props} />
    );

    const renderMenu = (props) => (
        <div style={menuContainerStyles} ref={menuRef}>
            <components.Menu {...props} />
        </div>
    );

    const renderControl = (props) => (
        <div ref={controlRef}>
            <components.Control {...props} />
        </div>
    );

    return (
        <div>
            <Row>
                <Col>
                    <Select
                        value={hasSubOptions(value) ? subValue : value}
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
                            onValueChange(newValue as NestedOption<Option>, actionMeta as ActionMeta<Option>)
                        }
                        menuStyles={menuStyles}
                        {...props}
                    />
                </Col>
                <Col>
                    {currentSubOptions != null &&
                        <Select
                            value={subValue}
                            options={currentSubOptions}
                            menuIsOpen={isOpen}
                            components={{
                                Control: () => null
                            }}
                            onChange={(newValue, actionMeta) =>
                                onSubValueChange(newValue as Option, actionMeta as ActionMeta<Option>)
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

const ForwardedPanelledSelect = forwardRef(PanelledSelect) as <Option,>(
    props: PanelledSelectProps<Option> & { 
        ref?: Ref<SelectInstance>
    }
) => ReactElement;

export { ForwardedPanelledSelect as PanelledSelect};
