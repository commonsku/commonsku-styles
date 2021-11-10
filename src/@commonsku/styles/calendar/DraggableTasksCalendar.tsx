import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { getWeek, } from 'date-fns'
import { CalendarTask, CalendarTaskProps, } from '../Task';
import { CalendarProps } from './Calendar';
import { TabType } from '../Tabs';
import { useCalendar } from '../hooks';
import { Row, Col } from '../FlexboxGrid';
import CalendarDayBody from './CalendarDayBody';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarWrapper from './CalendarWrapper';
import DaysBodyWrapper from './DaysBodyWrapper';
import TasksCalendarHeader from './TasksCalendarHeader';
import DraggableCalendarFooterTasks from './DraggableCalendarFooterTasks';
import { convertTasksToDays } from './TasksCalendar';
import { draggableChildWrapperProps, droppableChildWrapperProps } from './styles';
import {LabeledCheckbox} from '../Input';


type ACTIONS = 'TOGGLE_CHECKBOX' | 'DROP';
export type onUpdateTaskFunc = (newData: CalendarTaskProps, otherData: {
  index: number,
  action: ACTIONS,
  oldTask: CalendarTaskProps,
  sourceType?: string,
  updatedFields?: string[],
  day__id?: string;
  task__id?: string;
}) => void | any;
export type onClickTaskFunc = (task: CalendarTaskProps) => void | any;

type NewCalendarTaskProps = CalendarTaskProps & {__id__: string};
export type DraggableTaskBodyProps = {
  index: number;
  onClickTask?: onClickTaskFunc;
  onUpdateTask?: onUpdateTaskFunc;
  task: NewCalendarTaskProps;
};
const DraggableTaskBody = ({
  index, task, onUpdateTask, onClickTask,
}: DraggableTaskBodyProps) => {
  return (
    <Draggable
      key={task.__id__}
      draggableId={task.__id__}
      index={index}
    >
      {(provided, snapshot) => (
        <div {...draggableChildWrapperProps(provided, snapshot)}>
          <Col onClick={(e: React.MouseEvent) => { onClickTask && onClickTask(task); }}>
            <CalendarTask {...task}
              date={undefined}
              onClickCheckbox={(completed: boolean) => {
                if (onUpdateTask) {
                  onUpdateTask({ ...task, completed, }, {
                    index,
                    action: 'TOGGLE_CHECKBOX',
                    oldTask: task,
                    updatedFields: ['completed'],
                  });
                } else if (task.onClickCheckbox) {
                  task.onClickCheckbox(completed);
                }
              }}
            />
          </Col>
        </div>
      )}
    </Draggable>
  );
};

type DroppableDaysProps = { days: DaysObject; selectedDate: Date; onClickTask?: onClickTaskFunc; onUpdateTask?: onUpdateTaskFunc; onClickDay: (day: any) => void; [key: string]: any; weekend?: boolean; };
const DroppableDays = ({days, selectedDate, onUpdateTask, onClickDay, onClickTask, weekend, ...props}: DroppableDaysProps) => {
  return (
    <DaysBodyWrapper className="days-body-wrapper" {...props}>
      <Row className="day-body-wrapper-row">
        {Object.entries(days).map(([__id__, d], i) => (
          (!(!weekend && (d.day.getDay() === 6 || d.day.getDay() === 0)) ?
          <CalendarDayBody
            key={__id__}
            day={d.day}
            selectedDate={selectedDate}
            weekend={weekend}
            onClick={() => { onClickDay && onClickDay(d.day); }}
          >
            <Row>
              <Droppable droppableId={__id__} key={__id__}>
              {(provided, snapshot) => (
                  <div {...droppableChildWrapperProps(provided, snapshot)}>
                    {d.tasks.map((t, j) => (
                      <DraggableTaskBody key={t.__id__} index={j} task={t} onClickTask={onClickTask} onUpdateTask={onUpdateTask ? (newData, otherData) => {
                        onUpdateTask(newData, { ...otherData, day__id: __id__, task__id: t.__id__ });
                      } : undefined} />
                    ))}
                  </div>
                )}
              </Droppable>
            </Row>
          </CalendarDayBody> : "")
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
        <div {...droppableChildWrapperProps(provided, snapshot, { style: !tasks.length ? {minHeight: 0} : {minHeight: 0} })}>
          <DraggableCalendarFooterTasks {...props} tasks={tasks} />
        </div>
      )}
    </Droppable>
  );
};

type DraggableTasksCalendarProps = CalendarProps & {
  tasks: Array<CalendarTaskProps>;
  onUpdateTask: onUpdateTaskFunc;
  onClickTask?: onClickTaskFunc;
  headerTabs?: Array<TabType>;
  footerTasks?: Array<CalendarTaskProps>;
  weekend?: boolean;
  components?: {
    Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  },
};

type Day = { __id__: string; day: Date; tasks: Array<NewCalendarTaskProps>; };
type DaysObject = { [key: string]: Day };
type State = {
  days: DaysObject,
  footerTasks: Array<CalendarTaskProps>,
  weekend: boolean,
};

const DraggableTasksCalendar = ({
  tasks = [],
  onUpdateTask,
  onClickTask,
  headerTabs = [],
  footerTasks = [],
  components = {},
  weekend=false,
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
    weekend: weekend,
  });
  const [showWeekend, setShowWeekend] = useState(weekend);

  useEffect(() => {
    setShowWeekend(weekend);
  }, [weekend]);

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

  const headerProps = {
    onNextWeek,
    onPrevWeek,
    onNextMonth,
    onPrevMonth,
    currentMonth,
    currentWeek,
    selectedDate,
  };

  const onDragEnd = (result: DropResult) => {
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
          __id__: `day-${getWeek(destColumn.day)}-${destColumn.day.getDate()}-task-${destination.index}`,
          date: new Date(
            destColumn.day.getFullYear(),
            destColumn.day.getMonth(),
            destColumn.day.getDate(),
            removed.date?.getHours(),
            removed.date?.getMinutes(),
            removed.date?.getSeconds(),
            removed.date?.getMilliseconds(),
          ),
        };

        const destItems = [...destColumn.tasks];
        destItems.splice(destination.index, 0, newTask);
        onUpdateTask(newTask, {
          action: 'DROP',
          oldTask: removed,
          sourceType: 'FOOTER',
          index: destination.index,
          updatedFields: ['date'],
        });
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
        const newTask = {
          ...removed,
          date: new Date(
            destColumn.day.getFullYear(),
            destColumn.day.getMonth(),
            destColumn.day.getDate(),
            removed.date?.getHours(),
            removed.date?.getMinutes(),
            removed.date?.getSeconds(),
            removed.date?.getMilliseconds(),
          ),
        };

        destItems.splice(destination.index, 0, newTask);
        onUpdateTask(newTask, {
          action: 'DROP',
          oldTask: removed,
          sourceType: 'COLUMN',
          index: destination.index,
          updatedFields: ['date'],
        });
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
        onUpdateTask(removed, {
          action: 'DROP',
          oldTask: removed,
          sourceType: 'COLUMN',
          index: destination.index,
        });
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
        <LabeledCheckbox label="Weekends"
          checked={showWeekend}
          onChange={(e: Event) => setShowWeekend(s => !s)}
        />
        <TasksCalendarHeader {...headerProps} tabs={headerTabs} />
        <div className="calendar-scroll">
          <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} weekend={showWeekend} />
          <DroppableDays
            days={state.days}
            selectedDate={selectedDate}
            onClickDay={onClickDay}
            onClickTask={onClickTask}
            weekend={showWeekend}
            onUpdateTask={(newData, {day__id, task__id, ...otherData}) => {
              if (!day__id) {return;}
              _.flowRight(() => {
                onUpdateTask(newData, otherData);
              }, () => {
                setState(s => {
                  return { ...s,
                    days: { ...s.days,
                      [day__id]: { ...s.days[day__id],
                        tasks: [
                          ...s.days[day__id].tasks.slice(0, otherData.index),
                          {...s.days[day__id].tasks[otherData.index], ...newData},
                          ...s.days[day__id].tasks.slice(otherData.index+1),
                        ],
                      }
                    },
                  };
                });
              })();
            }}
          />
        </div>
        <DroppableFooter tasks={state.footerTasks} {...headerProps} />
      </CalendarWrapper>
    </DragDropContext>
  );
}

export default DraggableTasksCalendar;
