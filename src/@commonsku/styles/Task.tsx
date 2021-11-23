import _ from 'lodash'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { LabeledCheckbox } from './Input'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const TaskLabel = styled.div`display: flex; min-height: 25px; padding-right: 25px;`
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
  onClickCheckbox?: (checked?: boolean) => any,
};
const Task = ({
  taskName,
  date,
  done,
  assignee,
  taskBody,
  initialChecked,
  onClickCheckbox,
  ...props
}: React.PropsWithChildren<TaskProps & SharedStyleTypes>) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  return (
    <StyledTask {...props}>
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
}

const StyledCalendarTaskBody = styled.span<{preWrap?: boolean}>`
    font-size: 13px;
    font-family: 'skufont-regular',sans-serif,Roboto;
    font-weight: normal;
    white-space: pre-wrap;
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
  wordLength?: number | null;
  onClickCheckbox?: (checked?: boolean) => any;
};

const CalendarTask = React.forwardRef(({
  title,
  description,
  date,
  completed=false,
  assignee,
  onClickCheckbox,
  descriptionLength=null,
  colorType='light-green',
  ...props
}: React.PropsWithChildren<CalendarTaskProps & SharedStyleTypes>, ref: React.Ref<HTMLInputElement>) => {
  const [checked, setChecked] = useState<boolean>(completed);

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  return (
    <StyledCalendarTaskWrapper
      backgroundColor={colorType === 'light-red' ? '#ffebf2' : '#01d37417'}
      {...props}
    >
      <LabeledCheckbox ref={ref}
        checked={checked}
        checkboxPosition="top-right"
        checkboxStyle={{
          borderColor: checked
            ? undefined : (
              colorType === 'light-red' ? 'rgba(209, 69, 121, 0.24)' : '#BEF1DA'
            ),
        }}
        hoverByLabel={false}
        labelStyle={{width: '100%', paddingLeft: 0, paddingRight: 0, marginRight: 0, marginLeft: 0, margin: 0,}}
        label={
          <TaskLabel onClick={e => { e.preventDefault(); }} style={{fontWeight: 'bold' }}>
            <TaskName>{title}</TaskName>
            {date ? <div>{_.isDate(date) ? format(date, 'yyyy-mm-dd') : date}</div> : null}
          </TaskLabel>
        }
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
      />
      <StyledCalendarTaskBody preWrap={typeof description === 'string'}>
        {typeof description === 'string' && descriptionLength ?
            description.slice(0, descriptionLength)
           : description}
      </StyledCalendarTaskBody>
      <div className="task-metadata">
        {typeof assignee !== "undefined" ? "for " + assignee! : null}
        {typeof assignee !== "undefined" ? "on " : null}
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
