import styled from 'styled-components'
import React, { useState } from 'react'
import { isDate } from 'lodash'
import { format } from 'date-fns'
import {LabeledCheckbox} from './Input'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const TaskLabel  = styled.div`display: flex;`
const TaskName   = styled.div`flex-grow: 1;`
const StyledTask = styled.div<SharedStyleTypes>`margin-bottom: 1.5em; ${SharedStyles}`
const TaskBody   = styled.div`margin-left:34px;`

export type TaskProps = {
  taskName: string,
  date?: string,
  done?: boolean,
  assignee?: string,
  taskBody: string | React.ReactNode,
  checked?: boolean,
  onClickCheckbox?: (val: any) => any,
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
  const [checked, setChecked] = useState(initialChecked);
  return (
    <StyledTask {...props}>
      <LabeledCheckbox checked={checked} label={
        <TaskLabel>
          <TaskName>{taskName}</TaskName>
          {date ? <div>{date}</div> : null}
        </TaskLabel>} onChange={() => {
          setChecked(s => {
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

const StyledCalendarTask = styled(Task)<{ colorType?: string; }>`
    border-radius: 5px;
    background: ${p => p.colorType === 'light-red' ? '#ffebf2' : '#01d37417'};
    padding: 5px;
    margin-bottom: 0;
    height: 100%;
`;

const StyledCalendarTaskBody = styled.span`
    font-size: 15px;
    font-family: 'skufont-regular',sans-serif,Roboto;
    font-weight: normal;
`;

export type CalendarTaskProps = {
  title: string,
  description?: string | React.ReactNode,
  completed?: boolean,
  date?: Date | string,
  colorType?: string,
  overdue?: boolean,
  onClickCheckbox?: Function|VoidFunction,
};

const CalendarTask = ({ title, description, completed = false, date, colorType='light-green', overdue = false, ...props }: CalendarTaskProps) => {
    return (
        <StyledCalendarTask
            taskName={title}
            taskBody={<StyledCalendarTaskBody>{description}</StyledCalendarTaskBody>}
            date={isDate(date) ? format(date, 'yyyy-mm-dd') : date}
            colorType={colorType}
            initialChecked={completed}
            {...props}
        />
    );
}

export {
  Task,
  StyledTask,
  TaskLabel,
  TaskName,
  TaskBody,
  StyledCalendarTask,
  StyledCalendarTaskBody,
  CalendarTask,
};
