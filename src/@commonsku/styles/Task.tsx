import styled from 'styled-components'
import React from 'react'
import { isDate } from 'lodash'
import { format } from 'date-fns'
import {LabeledCheckbox} from './Input'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const TaskLabel  = styled.div`display: flex;`
const TaskName   = styled.div`flex-grow: 1;`
const StyledTask = styled.div<SharedStyleTypes>`margin-bottom: 1.5em; ${SharedStyles}`
const TaskBody   = styled.div`margin-left:34px;`

const Task = (props: React.PropsWithChildren<{
  taskName: string,
  date?: string,
  done?: boolean,
  assignee?: string,
  taskBody: string | React.ReactNode
} & SharedStyleTypes>) => {
  return (
    <StyledTask {...props}>
      <LabeledCheckbox checked={false} label={
      <TaskLabel>
        <TaskName>{props.taskName}</TaskName>
        {props.date ? <div>{props.date}</div> : null}
      </TaskLabel>} />
      <TaskBody>{props.taskBody}</TaskBody>
      <div className="task-metadata">
        {typeof props.assignee !== "undefined" ? "for " + props.assignee! : null}
        {typeof props.assignee !== "undefined" ? "on " : null} 
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
};

const CalendarTask = ({ title, description, completed = false, date, colorType='light-green', overdue = false, ...props }: CalendarTaskProps) => {
    return (
        <StyledCalendarTask
            taskName="Vandelay 3"
            taskBody={<StyledCalendarTaskBody>{description}</StyledCalendarTaskBody>}
            date={isDate(date) ? format(date, 'yyyy-mm-dd') : date}
            colorType={colorType}
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
