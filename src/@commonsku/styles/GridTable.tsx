import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, IconButton } from './Button';
import { SizerTypes } from './Sizer';
import { AddIcon, CheckmarkIcon, DragIcon } from './icons';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { errors, green, neutrals } from "./colors";
import { fontStyles, themeOptions } from "./Theme";
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { Popup } from "./Popup";

const GridTableContainer = styled.div<{
  width?: string,
  gridTemplateRows?: string,
  gridTemplateColumns: string,
  gridRowGap?: string;
  gridColumnGap?: string;
} & SharedStyleTypes>`
    display:grid;
    grid-template-rows: ${props => props.gridTemplateRows ? props.gridTemplateRows : 'auto'};
    grid-gap: ${props => props.gridRowGap ? props.gridRowGap : "16px"};
    width:${props => props.width ? props.width : '100%'};
    margin-top: 24px;
    margin-bottom: 24px;
    background: white;
    overflow: scroll;
    .droppable {
        display:grid;
        grid-template-rows: ${props => props.gridTemplateRows ? props.gridTemplateRows : 'auto'};
        grid-gap: ${props => props.gridRowGap ? props.gridRowGap : "16px"};
      }
    ${SharedStyles}
`;

const GridRow = styled.div<{ gridTemplateColumns: string, gridColumnGap?: string } & SharedStyleTypes>`
    display:grid;
    grid-template-columns: ${props => props.gridTemplateColumns};
    grid-gap: ${props => props.gridColumnGap ? props.gridColumnGap : "16px"};
    width:100%;
    background: white;
    ${SharedStyles}
`;


const GridCell = styled.div<{ width?: string, header?: boolean, centerContent?: boolean; } & SharedStyleTypes>` 
    background: white;
    width: ${props => props.width ? props.width : 'auto'};
    font-family: ${props => props.header ? themeOptions.fontFamilies.bold : fontStyles.p.medium};
    color: ${props => props.header ? errors.main : neutrals.bodyText};
    text-align: ${props => props.centerContent ? 'center' : 'left'};
`;

const FieldError = styled.p`
    font-family: ${fontStyles.p.small.fontFamily};
    font-size: ${fontStyles.p.small.fontSize};
    color: ${errors['40']};
    margin:0;
`;

type TValue = string | number | object;

type TransformFunction = (value: any | { label: string; value: string }) => TValue;

type TChild = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

type ColumnProps = {
  name: string,
  title: React.ReactNode,
  children: TChild,
  centerContent?: boolean,
  transform?: TransformFunction,
}

type CellProps = {
  defaultValue: TValue;
  onUpdate?: (value: TValue) => void;
  validate?: (data: any) => false | string;
  transform: TransformFunction;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  centerContent?: boolean;
};

type GridTableProps = {
  data: { id: number | string;[key: string]: any }[];
  idField?: string;
  children: TChild | TChild[];
  onUpdate?: (value: object) => void;
  onDelete?: (id: number | string) => void;
  onAdd?: (data: any) => void;
  onSort?: (id: number | string, index: number | string) => void;
  validate?: (data: any) => { [key: string]: false | string };
  gridTemplateRows?: string;
  gridTemplateColumns?: string;
  gridRowGap?: string;
  gridColumnGap?: string;
} & SharedStyleTypes & SizerTypes;

const defaultTransform = (v: any) => v.target ? v.target.value : v.currentTarget ? v.currentTarget.value : v.value;

const Column = ({
  name,
  title,
  children,
  centerContent,
  transform = defaultTransform,
}: ColumnProps) => <GridCell centerContent={centerContent}>{title}</GridCell>;


const Cell = ({
  defaultValue,
  onUpdate,
  children,
  validate,
  centerContent,
  transform = (v) => v
}: CellProps) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleOnChange: (v: Event | { label: string; value: string }) => void = (newValue) => {
    const errors = validate && validate(transform(newValue));
    if (errors) {
      setError(errors);
    } else {
      setError('');
    }
    setValue(transform(newValue));
  }

  const handleOnBlur: () => void = () => {
    if (!onUpdate) {
      return;
    }
    if (error) {
      setValue(defaultValue);
      setError('');
      return;
    }
    onUpdate(value);
  }

  let cell = React.cloneElement(
    React.Children.only(children),
    {
      value,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
    }
  );
  return (
    <GridCell centerContent={centerContent}>{cell} {<FieldError>{error}</FieldError>}</GridCell>
  );
}

function GridTable({
  data,
  idField = "id",
  onUpdate,
  onDelete,
  onAdd,
  onSort,
  validate,
  children,
  gridTemplateRows,
  gridTemplateColumns,
  gridRowGap,
  gridColumnGap,
  ...props
}: GridTableProps) {

  const [NewData, setNewData] = useState({});
  const [Adding, setAdding] = useState(false);
  const [newRowError, setNewRowError] = useState({});
  const [showPopupWithRowId, setShowPopupWithRowId] = useState<number | string>(0);

  const hasNewRowError = Object.keys(newRowError).length === 0 || Object.values(newRowError).filter(v => v).length > 0;

  const handleColumnsDefault = () => {
    if (gridTemplateColumns) {
      if (onSort && onDelete) {
        return `auto ${gridTemplateColumns} auto`;
      } else if (onSort && !onDelete) {
        return `auto ${gridTemplateColumns}`;
      } else if (onSort && onDelete) {
        return `${gridTemplateColumns} auto`;
      }

      return gridTemplateColumns;
    } else {
      let columnsDefault = '';

      React.Children.map(children, (child, index) => {
        columnsDefault += "minmax(136px, 1fr) "
      });

      if (onSort) {
        columnsDefault = "auto " + columnsDefault;
      }

      if (onDelete) {
        columnsDefault += "auto"
      }

      return columnsDefault;
    }

  };

  let gridColumns = handleColumnsDefault();

  const handleAdd = () => {
    const Errors = (validate && validate(NewData)) || {};
    console.log(Errors);
    if (Object.values(Errors).some(v => v)) {
      return
    }

    onAdd && onAdd(NewData);
    setNewData({});
    setAdding(false);
  };

  function handleOnDragEnd(result: DropResult, provided: ResponderProvided): void {
    if (!result.destination) return;
    if (!onSort) return;

    const item = data[result.source.index];
    onSort(item[idField], result.destination.index);
  }

  const Header = <GridRow gridTemplateColumns={gridColumns} gridColumnGap={gridColumnGap}>
    {onSort && <GridCell><div style={{ width: '24px' }}></div></GridCell>}
    {React.Children.map(children, (child, child_index) => {
      return (
        <GridCell key={child.props.name} centerContent={child.props.centerContent}
        >
          {child.props.title}
        </GridCell>
      );
    })}
    {onDelete && <GridCell><div style={{ width: '40px' }}></div></GridCell>}
  </GridRow>;

  const Rows = () => {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="draggable-rows">
          {(provided) => (
            <div
              className="droppable"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {data.map((d, index) => {
                return (
                  <Draggable
                    key={d[idField]}
                    draggableId={d[idField].toString()}
                    index={index}
                    isDragDisabled={!onSort}
                  >
                    {(provided) => (
                      <GridRow
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        gridTemplateColumns={gridColumns}
                        gridColumnGap={gridColumnGap}>
                        {onSort && <GridCell style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', height: '40px' }}><DragIcon color={neutrals['60']} style={{ cursor: 'grab', verticalAlign: 'middle' }} /></GridCell>}
                        {React.Children.map(children, child => {
                          if (!child) {
                            return null;
                          }
                          const validateCell = (value: any) => (validate && validate({ [child.props.name]: value })[child.props.name]) ?? false;

                          return <Cell
                            key={child.props.name}
                            defaultValue={d[child.props.name]}
                            onUpdate={(value) => setNewData(s => ({ ...s, [child.props.name]: value }))}
                            transform={child.props.transform || defaultTransform}
                            validate={validate && validateCell}
                            centerContent={child.props.centerContent}
                          >
                            {child.props.children}

                          </Cell>
                        })}
                        {onDelete && <GridCell><IconButton preset="delete" onClick={() => setShowPopupWithRowId(d[idField])} /></GridCell>}
                      </GridRow>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const NewRow = (
    <GridRow
      gridTemplateColumns={gridColumns}
      gridColumnGap={gridColumnGap}
    >
      {onSort &&
        <GridCell >
          <div style={{ width: '24px' }}></div>
        </GridCell>}
      {React.Children.map(children, child => {
        if (!child) {
          return null;
        }

        const validateCell = (value: any) => {
          const validation = validate && validate({ ...NewData, [child.props.name]: value });
          if (!validation) { return false; }
          setNewRowError(validation);
          return validation[child.props.name];
        }

        return <Cell
          key={child.props.name}
          defaultValue={NewData[child.props.name]}
          onUpdate={(value) => setNewData(s => ({ ...s, [child.props.name]: value }))}
          transform={child.props.transform || defaultTransform}
          validate={validateCell}
          centerContent={child.props.centerContent}
        >
          {child.props.children}
        </Cell>
      })}
      <GridCell>
        <IconButton Icon={CheckmarkIcon} iconProps={{ color: green.main }} variant={hasNewRowError ? "disabled" : "text"} onClick={() => handleAdd()}
          disabled={hasNewRowError}
        />
      </GridCell>
    </GridRow>
  );

  const AddNew = onAdd ?
    <GridRow gridTemplateColumns={"auto"} gridColumnGap={gridColumnGap}
    >
      <GridCell centerContent>
        <IconButton Icon={AddIcon} variant="text" size="small" onClick={() => setAdding(true)}>Add New</IconButton>
      </GridCell>
    </GridRow>
    : null;

  return (
    <>
      {showPopupWithRowId !== 0 ?
        <Popup
          width={'auto'}
          height={'auto'}
          padding={'36px'}
          noHeader
          noCloseButton
        >
          <p style={{
            fontFamily: fontStyles.p.medium.fontFamily,
            fontSize: fontStyles.p.medium.fontSize,
            lineHeight: fontStyles.p.medium.lineHeight,
            color: neutrals.bodyText
          }}>Are you sure you want to delete?</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              size="medium"
              variant='secondary'
              mr={24}
              onClick={() => {
                setShowPopupWithRowId(0);
              }}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              variant='error'
              onClick={() => {
                onDelete && onDelete(showPopupWithRowId);
                setShowPopupWithRowId(0);
              }}
            >
              Delete
            </Button>
          </div>

        </Popup> : null}

      <GridTableContainer
        gridTemplateRows={gridTemplateRows}
        gridTemplateColumns={gridColumns}
        gridRowGap={gridRowGap}
        gridColumnGap={gridColumnGap}
        {...props}
      >
        {Header}
        {Rows()}
        {Adding && NewRow}
        {onAdd && !Adding && AddNew}
      </GridTableContainer></>
  );
}

export { GridTableContainer, GridTable, GridRow, GridCell, Column };







