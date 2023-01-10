import _ from 'lodash'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { LabeledCheckbox } from './Input'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const TaskLabel = styled.div<{hasCheckbox?: boolean;}>`display: flex; min-height: 25px; ${p => p.hasCheckbox ? `width: calc(100% - 24px);` : ''}`
const TaskName = styled.div`flex-grow: 1; font-size:13px;`
const StyledTask = styled.div<SharedStyleTypes>`margin-bottom: 1.5em; ${SharedStyles}`
const TaskBody = styled.div`margin-left:34px;`

export type TaskProps = {
  taskName: string,
  date?: string,
  done?: boolean,
  assignee?: string,
  taskBody: string | React.ReactNode,
  checked?: boolean,
  initialChecked?: boolean;
  onClickCheckbox?: (checked?: boolean) => any,
};
const Task = React.forwardRef<HTMLDivElement,TaskProps & SharedStyleTypes> (({
  taskName,
  date,
  done,
  assignee,
  taskBody,
  initialChecked=false,
  onClickCheckbox,
  ...props
}: React.PropsWithChildren<TaskProps & SharedStyleTypes>, ref) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  return (
    <StyledTask ref={ref} {...props}>
      <LabeledCheckbox checked={checked} label={
        <TaskLabel>
          <TaskName>{taskName}</TaskName>
          {date ? <div>{date}</div> : null}
        </TaskLabel>} onChange={() => {
          setChecked((s: boolean) => {
            onClickCheckbox && onClickCheckbox(!s);
            return !s;
          });
        }} />
      <TaskBody>{taskBody}</TaskBody>
      <div className="task-metadata">
        {typeof assignee !== "undefined" ? "for " + assignee! : null}
        {typeof assignee !== "undefined" ? "on " : null}
      </div>
    </StyledTask>
  );
});

const StyledCalendarTaskBody = styled.span`
    font-size: 13px;
    font-family: 'skufont-regular',sans-serif,Roboto;
`;

const StyledCalendarTaskWrapper = styled(StyledTask)<{backgroundColor?: string;}>`
border-radius: 5px;
${p => p.backgroundColor ? `background-color: ${p.backgroundColor};` : ''}
padding: 5px;
margin: 0;
height: 100%;
margin-bottom: 7px;
`;

export type CalendarTaskProps = {
  id?: string;
  title: string;
  description: string | React.ReactNode;
  date?: Date;
  completed?: boolean;
  colorType?: string;
  assignee?: string;
  checked?: boolean;
  overdue?: boolean;
  order?: number;
  onClickCheckbox?: (checked: boolean) => any;
  isDescriptionHtml?: boolean;
  draggable?: boolean;
  hideCheckbox?: boolean;
  Icon?: React.ReactNode;
};

type CalendarTaskHtmlProps = CalendarTaskProps
  & SharedStyleTypes
  & React.InputHTMLAttributes<HTMLInputElement>;
const CalendarTask = React.forwardRef<HTMLInputElement, CalendarTaskHtmlProps>((
  {
    title,
    description,
    date,
    completed=false,
    assignee,
    onClickCheckbox,
    colorType='light-green',
    isDescriptionHtml=false,
    hideCheckbox=false,
    Icon=null,
    ...props
  },
  ref
) => {
  const [checked, setChecked] = useState<boolean>(completed);

  useEffect(() => {
    setChecked(completed);
  }, [completed, title, date]);

  const checkboxStyles = React.useMemo(() => {
    const styles: React.CSSProperties = {};
    if (!checked) {
      if (colorType === 'light-red') {
        styles['borderColor'] = 'rgba(209, 69, 121, 0.24)';
      } else {
        styles['borderColor'] = '#BEF1DA';
      }
    } else {
      styles['filter'] = 'saturate(0)';
    }
    return styles;
  }, [checked, colorType]);

  const RenderTaskLabel = React.useCallback(() => {
    let DateElem: React.ReactNode = null;
    if (date) {
      DateElem = <div>{_.isDate(date) ? format(date, 'yyyy-mm-dd') : date}</div>;
    }

    return (
      <TaskLabel
        onClick={e => { e.preventDefault(); }}
        style={{fontWeight: 'bold' }}
        hasCheckbox={!hideCheckbox}
      >
        <TaskName style={{width: hideCheckbox && Icon ? '80%' : '100%'}}>{title}</TaskName>
        {DateElem}
        {hideCheckbox && Icon ? Icon : null}
      </TaskLabel>
    );
  }, [date, title, hideCheckbox, Icon]);

  return (
    <StyledCalendarTaskWrapper
      backgroundColor={colorType === 'light-red' ? '#ffebf2' : '#01d37417'}
      {...props}
      style={{
        ...(props.style || {}),
        ...(checked ? { filter: 'saturate(0)' } : {}),
      }}
    >
      {!hideCheckbox ? <LabeledCheckbox ref={ref}
        stopPropagation
        checked={checked}
        checkboxPosition="top-right"
        checkboxStyle={checkboxStyles}
        hoverByLabel={false}
        labelStyle={{width: '100%', paddingLeft: 0, paddingRight: 0, marginRight: 0, marginLeft: 0, margin: 0,}}
        label={RenderTaskLabel()}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          e && e.preventDefault();
          e && e.stopPropagation();
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e && e.preventDefault();
          e && e.stopPropagation();
          setChecked((s: boolean) => {
            onClickCheckbox && onClickCheckbox(!s);
            return !s;
          });
        }}
        style={{
          padding: 0,
          margin: 0,
          marginLeft: 20,
        }}
      /> : RenderTaskLabel()}
      <StyledCalendarTaskBody
        {...(isDescriptionHtml && typeof description === 'string'
            ? { dangerouslySetInnerHTML: { __html: description } }
            : { children: description })}
      />
      <div className="task-metadata">
        {assignee ? "for " + assignee : null}
        {assignee ? "on " : null}
      </div>
    </StyledCalendarTaskWrapper>
  );
});

export {
  Task,
  StyledTask,
  TaskLabel,
  TaskName,
  TaskBody,
  StyledCalendarTaskBody,
  CalendarTask,
};
