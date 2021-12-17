import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { CalendarTaskProps, } from '../Task';
import DraggableCalendarFooterTasks from './DraggableCalendarFooterTasks';
import { droppableChildWrapperProps } from './styles';
import { onClickTaskFunc, onUpdateTaskFunc } from './types';

type DroppableFooterProps = {
  onNextWeek: () => void;
  onPrevWeek: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  currentMonth: Date;
  currentWeek: number;
  selectedDate: Date;
  onClickTask?: onClickTaskFunc;
  onUpdateTask?: onUpdateTaskFunc;
  tasks: Array<CalendarTaskProps>;
};
const DroppableFooter = ({tasks, ...props}: DroppableFooterProps) => {
  return (
    <Droppable droppableId={'footer-droppable'} key={'footer-droppable'} isDropDisabled>
      {(provided, snapshot) => (
        <div {...droppableChildWrapperProps(provided, snapshot, { style: !tasks.length ? {minHeight: 0} : {minHeight: 0} })}>
          {provided.placeholder}
          <DraggableCalendarFooterTasks {...props} tasks={tasks} />
        </div>
      )}
    </Droppable>
  );
};

export default DroppableFooter;
