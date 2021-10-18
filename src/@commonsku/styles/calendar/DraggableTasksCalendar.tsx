import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getWeek, } from 'date-fns'
import { CalendarTaskProps, } from '../Task';
import { CalendarProps } from './Calendar';
import { TabType } from '../Tabs';
import { useCalendar } from '../hooks';
import { Row, Col } from '../FlexboxGrid';
import { CalendarDayBody, CalendarDaysHeader, CalendarWrapper, DaysBodyWrapper } from '.';
import TasksCalendarHeader from './TasksCalendarHeader';
import DraggableCalendarFooterTasks from './DraggableCalendarFooterTasks';
import { convertTasksToDays } from './TasksCalendar';
import { CalendarTask } from '..';
import { draggableChildWrapperProps, droppableChildWrapperProps } from './styles';


const DraggableTaskBody = ({
  index, task,
}) => {
  return (
    <Draggable
      key={task.__id__}
      draggableId={task.__id__}
      index={index}
    >
      {(provided, snapshot) => (
        <div {...draggableChildWrapperProps(provided, snapshot)}>
          <Col xs padded><CalendarTask {...task} date="" /></Col>
        </div>
      )}
    </Draggable>
  );
};

type DroppableDaysProps = { days: DaysObject; selectedDate: Date; onClickDay: (day: any) => void; [key: string]: any; };
const DroppableDays = ({days, selectedDate, onClickDay, ...props}: DroppableDaysProps) => {
  return (
    <DaysBodyWrapper className="days-body-wrapper" {...props}>
      <Row className="day-body-wrapper-row">
        {Object.entries(days).map(([__id__, d], i) => (
          <CalendarDayBody
            key={__id__}
            day={d.day}
            selectedDate={selectedDate}
            onClick={() => { onClickDay && onClickDay(d.day); }}
          >
            <Row>
              <Droppable droppableId={__id__} key={__id__}>
              {(provided, snapshot) => (
                  <div {...droppableChildWrapperProps(provided, snapshot)}>
                    {d.tasks.map((t, j) => (
                      <DraggableTaskBody key={t.__id__} index={j} task={t} />
                    ))}
                  </div>
                )}
              </Droppable>
            </Row>
          </CalendarDayBody>
        ))}
      </Row>
    </DaysBodyWrapper>
  );
};

type DroppableFooterProps = {
  tasks: Array<CalendarTaskProps>;
  onNextWeek: () => void;
  onPrevWeek: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  currentMonth: Date;
  currentWeek: number;
  selectedDate: Date;
  [key: string]: any;
};
const DroppableFooter = ({tasks, ...props}: DroppableFooterProps) => {
  return (
    <Droppable droppableId={'footer-droppable'} key={'footer-droppable'} isDropDisabled>
      {(provided, snapshot) => (
        <div {...droppableChildWrapperProps(provided, snapshot, { style: !tasks.length ? {minHeight: 0} : {} })}>
          <DraggableCalendarFooterTasks {...props} tasks={tasks} />
        </div>
      )}
    </Droppable>
  );
};

type DraggableTasksCalendarProps = CalendarProps & {
  tasks: Array<CalendarTaskProps>;
  onUpdateTask: Function;
  headerTabs?: Array<TabType>;
  footerTasks?: Array<CalendarTaskProps>;
  components?: {
    Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  },
};

type Day = { __id__: string; day: Date; tasks: Array<{ __id__: string; } & CalendarTaskProps>; };
type DaysObject = { [key: string]: Day };
type State = {
  days: DaysObject,
  footerTasks: Array<CalendarTaskProps>,
};

const DraggableTasksCalendar = ({
  tasks = [],
  onUpdateTask,
  headerTabs = [],
  footerTasks = [],
  components = {},
  ...props
}: DraggableTasksCalendarProps) => {
  const {
    currentMonth,
    currentWeek,
    selectedDate,
    onNextWeek,
    onPrevWeek,
    onNextMonth,
    onPrevMonth,
    onClickDay,
  } = useCalendar();

  const [state, setState] = useState<State>({
    days: convertTasksToDays({ currentMonth, currentWeek, tasks, }).reduce(
      (acc, v) => ({ ...acc, [v.__id__]: v }), {}
    ),
    footerTasks: footerTasks.filter(t => t.date ? getWeek(t.date) < currentWeek : false),
  });

  useEffect(() => {
    setState(s => ({
      ...s,
      days: convertTasksToDays({ currentMonth, currentWeek, tasks, })
            .reduce((acc, v) => ({ ...acc, [v.__id__]: v }), {}),
    }));
  }, [currentMonth, currentWeek, tasks]);

  useEffect(() => {
    setState(s => ({...s, footerTasks: footerTasks.filter(t => t.date ? getWeek(t.date) < currentWeek : false), }));
  }, [footerTasks, currentWeek]);

  useEffect(() => {
  }, [state.days]);

  const headerProps = {
    onNextWeek,
    onPrevWeek,
    onNextMonth,
    onPrevMonth,
    currentMonth,
    currentWeek,
    selectedDate,
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, source, destination, reason } = result;
    if (reason === 'DROP' && destination.droppableId === 'footer-droppable') {
      return; // don't drop to footer
    }
    if (draggableId.startsWith('footer-task-')) {
      // drag from footer into the columns
      setState(s => {
        const days = s.days;
        const destColumn = days[destination.droppableId];

        const sourceTasks = s.footerTasks;
        const [removed] = sourceTasks.splice(source.index, 1);
        const newTask = {...removed,
          __id__: `day-${parseFloat(destination.droppableId.replace('day-'))}-task-${destination.index}`,
        };
        newTask.date?.setDate(destColumn.day.getDate());
        newTask.date?.setMonth(destColumn.day.getMonth());

        const destItems = [...destColumn.tasks];
        destItems.splice(destination.index, 0, newTask);
        onUpdateTask(newTask);
        return { ...s,
          days: { ...days, [destination.droppableId]: { ...destColumn, tasks: destItems, } },
          footerTasks: [ ...sourceTasks ],
        };
      });
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      setState(s => {
        const days = s.days;
        const sourceColumn = days[source.droppableId];
        const destColumn = days[destination.droppableId];

        const sourceItems = [...sourceColumn.tasks];
        const destItems = [...destColumn.tasks];
        const [removed] = sourceItems.splice(source.index, 1);
        const newTask = {...removed};
        newTask.date?.setDate(destColumn.day.getDate());
        newTask.date?.setMonth(destColumn.day.getMonth());

        destItems.splice(destination.index, 0, newTask);
        onUpdateTask(newTask);
        return { ...s,
          days: { ...days,
            [source.droppableId]: { ...sourceColumn, tasks: sourceItems, },
            [destination.droppableId]: { ...destColumn, tasks: destItems, }
          },
        };
      });
    } else {
      setState(s => {
        const days = s.days;
        const column = days[source.droppableId];
        const copiedItems = [...column.tasks];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        onUpdateTask(removed);
        return { ...s,
          days: { ...days, [source.droppableId]: { ...column, tasks: copiedItems, }}
        };
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={result => onDragEnd(result)}
    >
      <CalendarWrapper>
        <TasksCalendarHeader {...headerProps} tabs={headerTabs} />
        <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} />
        <DroppableDays days={state.days} selectedDate={selectedDate} onClickDay={onClickDay} />
        <DroppableFooter tasks={state.footerTasks} {...headerProps} />
      </CalendarWrapper>
    </DragDropContext>
  );
}

export default DraggableTasksCalendar;
