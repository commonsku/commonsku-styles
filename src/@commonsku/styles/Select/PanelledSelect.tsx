import React, { Ref, forwardRef, useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef, CSSProperties, ComponentType } from 'react';
import { SKUSelect as Select } from './Select';
import { Row } from '../FlexboxGrid';
import { ActionMeta, components as selectComponents, ControlProps, GroupBase, MenuProps, MultiValue, OnChangeValue, OptionProps, PropsValue, SelectInstance } from 'react-select'
import { useWindowSize } from '../hooks';
import { colors, getThemeColor } from '../Theme';
import { SKUSelectProps } from './types';

const menuContainerStyles: CSSProperties = {
    position: 'absolute',
    width: '100%',
}

const subMenuContainerStyles: CSSProperties = {
    position: 'absolute',
}

const menuStyles: CSSProperties = {
    position: 'relative',
    marginBottom: '0px !important',
}

const subMenuStyles: CSSProperties = {
    width: 'max-content',
    minWidth: '100%',
    borderTop: '1px solid',
    borderTopRightRadius: '5px',
    marginTop: 0,
}

export type NestedOption<Option> = Option & {
    subOptions?: Option[]
}

interface ParentOptionProps<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends OptionProps<Option, IsMulti, Group> {
    setFocusedOption: (hoveredValue: Option | undefined) => void,
    OptionComponent?: ComponentType<OptionProps<Option, IsMulti, Group>>,
}

const ParentOption = <
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    {
        setFocusedOption,
        OptionComponent,
        ...props
    }: ParentOptionProps<Option, IsMulti, Group>
) => {
    const { data: option, isFocused } = props;

    useEffect(() => {
        if (isFocused) {
            setFocusedOption(option);
        }
    }, [option, isFocused, setFocusedOption]);

    if (OptionComponent != null) {
        return (
            <OptionComponent {...props} />
        );
    }
    
    return (
        <selectComponents.Option {...props} />
    );
}

export interface PanelledSelectProps<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<
    SKUSelectProps<
        NestedOption<Option>,
        IsMulti,
        GroupBase<NestedOption<Option>>
    >, 
    'value' | 'options' | 'onChange'
> {
    value?: PropsValue<NestedOption<Option>>
    options?: Array<NestedOption<Option>>
    onChange?: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void
    subMenuProps?: Omit<SKUSelectProps<Option, IsMulti, Group>, 'value' | 'options' | 'onChange'>
}

const BasePanelledSelect = <
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    {
        value,
        options,
        onChange,
        subMenuProps,
        components,
        closeMenuOnSelect,
        hideSelectedOptions = false,
        ...props
    }: PanelledSelectProps<Option, IsMulti, Group>,
    ref?: Ref<SelectInstance<NestedOption<Option>, IsMulti, GroupBase<NestedOption<Option>>>>,
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
    }, [windowSize, value]);

    const hasSubOptions = useCallback((option: NestedOption<Option>) =>
        option != null && option.subOptions != null && option.subOptions.length > 0
    , []);

    const currentSubOptions = useMemo(() => {
        if (focusedOption != null && hasSubOptions(focusedOption)) {
            return focusedOption.subOptions;
        }

        return undefined;
    }, [hasSubOptions, focusedOption]);

    const onValueChange = (
        newValue: OnChangeValue<NestedOption<Option>, IsMulti>,
        actionMeta: ActionMeta<NestedOption<Option>>,
    ) => {
        if (onChange == null) return;
        
        if (newValue == null) {
            onChange(newValue, actionMeta);
        }

        if (isMulti) {
            const multiValue = newValue as MultiValue<NestedOption<Option>>;
            const singleValues = multiValue.filter(opt => !hasSubOptions(opt));

            onChange(singleValues as OnChangeValue<Option, IsMulti>, actionMeta);
            return;
        }

        if (!hasSubOptions(newValue as NestedOption<Option>)) {
            onChange(newValue, actionMeta);

            if (closeMenuOnSelect ?? !isMulti) {
                setOpen(false);
            }
        }
    }

    const onSubValueChange = (
        newSubValue: OnChangeValue<Option, IsMulti>,
        actionMeta: ActionMeta<Option>,
    ) => {
        if (onChange != null) {
            onChange(newSubValue, actionMeta);
        }

        if (closeMenuOnSelect ?? !isMulti) {
            setOpen(false);
        }
    }

    const renderParentOption = useCallback((
        props: OptionProps<
            NestedOption<Option>,
            IsMulti,
            GroupBase<NestedOption<Option>>
        >
    ) => (
        <ParentOption
            setFocusedOption={setFocusedOption}
            OptionComponent={components?.Option}
            {...props}
        />
    ), [setFocusedOption, components?.Option]);

    const renderMenu = useCallback((
        props: MenuProps<
            NestedOption<Option>,
            IsMulti,
            GroupBase<NestedOption<Option>>
        >
    ) => (
        <div style={{...menuContainerStyles }} ref={menuRef}>
            <selectComponents.Menu {...props} />
        </div>
    ), []);

    const renderSubMenu = useCallback((
        props: MenuProps<Option, IsMulti, GroupBase<Option>>
    ) => (
        <div style={subMenuContainerStyles}>
            <selectComponents.Menu {...props} />
        </div>
    ), []);

    const renderControl = useCallback((
        props: ControlProps<
            NestedOption<Option>,
            IsMulti,
            GroupBase<NestedOption<Option>>
        >
    ) => (
        <div ref={controlRef}>
            <selectComponents.Control {...props} />
        </div>
    ), []);

    const handleMenuOpen = (open: boolean) => {
        setOpen(open);

        // react-select's onMenuOpen triggers before the menu mounts to the DOM,
        // so we can't synchronously check for the rendered menu's height.
        // This workaround ensures the menu height will updatewhen the menu is opened.
        // https://github.com/JedWatson/react-select/issues/4243
        setTimeout(() => {
            menuRef.current != null && setMenuHeight(menuRef.current.offsetHeight);
        }, 1);
    }

    return (
        <div>
            <Row>
                <Select
                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                    value={value}
                    options={options}
                    onMenuOpen={() => handleMenuOpen(true)}
                    onMenuClose={() => handleMenuOpen(false)}
                    menuIsOpen={isOpen}
                    ref={ref}
                    components={{
                        ...components,
                        Option: renderParentOption,
                        Menu: renderMenu,
                        Control: renderControl,
                    }}
                    onChange={onValueChange}
                    menuStyles={menuStyles}
                    hideSelectedOptions={hideSelectedOptions}
                    closeMenuOnSelect={false}
                    {...props}
                />
                {currentSubOptions != null &&
                    <Select
                        value={value}
                        options={currentSubOptions}
                        menuIsOpen={isOpen}
                        onChange={onSubValueChange}
                        menuStyles={{
                            ...subMenuStyles, 
                            height: menuHeight,
                            top: controlHeight,
                            borderTopColor: error
                                ? getThemeColor(props, 'select.error.border', colors.select.error.border)
                                : getThemeColor(props, 'select.active.border', colors.select.active.border),
                        }}
                        hideSelectedOptions={hideSelectedOptions}
                        closeMenuOnSelect={false}
                        isMulti={isMulti}
                        {...subMenuProps}
                        components={{
                            Control: () => null,
                            ...(subMenuProps?.components),
                            Menu: renderSubMenu,
                        }}
                    />
                }
            </Row>
        </div>
    );
};

export const PanelledSelect = forwardRef(BasePanelledSelect) as <
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: PanelledSelectProps<Option, IsMulti> & { 
        ref?: Ref<SelectInstance<Option, IsMulti, Group>>
    }
) => ReturnType<typeof BasePanelledSelect>;
