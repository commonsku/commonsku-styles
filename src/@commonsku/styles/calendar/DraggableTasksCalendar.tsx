import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getWeek, getYear } from 'date-fns'
import { CalendarTaskProps, } from '../Task';
import { CalendarProps } from './Calendar';
import { TTab } from '../Tabs';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarWrapper from './CalendarWrapper';
import TasksCalendarHeader from './TasksCalendarHeader';
import DroppableFooter from './DroppableFooter';
import DroppableDays from './DroppableDays';
import { convertTasksToDays } from './TasksCalendar';
import {LabeledCheckbox} from '../Input';
import useCalendar, { useCalendarProps } from '../hooks/useCalendar';
import Loading from '../icons/Loading';
import { DaysObject, onClickTaskFunc, onUpdateTaskFunc, TCalendarView, onClickViewFunc } from './types';

export type DraggableTasksCalendarProps = CalendarProps & {
  tasks: Array<CalendarTaskProps>;
  onUpdateTask: onUpdateTaskFunc;
  onClickTask?: onClickTaskFunc;
  headerTabs?: Array<TTab>;
  footerTasks?: Array<CalendarTaskProps>;
  weekend?: boolean;
  components?: {
    Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  },
  onToggleWeekend?: (weekend: boolean) => void;
  showAddTaskBtn?: boolean;
  onClickAddTask?: VoidFunction;
  loading?: boolean;
  views?: Array<TCalendarView>;
  onClickView?: onClickViewFunc;
  showFooterTasks?: boolean;
} & useCalendarProps;

type State = {
  days: DaysObject,
  footerTasks: Array<CalendarTaskProps>,
};

const DraggableTasksCalendar = ({
  views = [],
  tasks = [],
  onUpdateTask,
  onClickTask,
  headerTabs = [],
  footerTasks = [],
  components = {},
  weekend=false,
  onChangeWeek,
  onChangeMonth,
  onToggleWeekend,
  showAddTaskBtn=true,
  onClickAddTask,
  onClickView,
  loading=false,
  showFooterTasks=true,
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
    onReset,
    changeDate,
    changeWeek
  } = useCalendar({onChangeWeek, onChangeMonth});

  const [state, setState] = useState<State>({
    days: convertTasksToDays({ currentMonth, currentWeek, tasks, }).reduce(
      (acc, v) => ({ ...acc, [v.__id__]: v }), {}
    ),
    footerTasks: footerTasks.filter(
      t => t.date
        ? (getWeek(t.date) < currentWeek && getYear(t.date) === getYear(currentMonth))
          || getYear(t.date) < getYear(currentMonth)
        : false
    ),
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
    setState(s => ({
      ...s,
      footerTasks: footerTasks.filter(
        t => t.date
          ? (getWeek(t.date) < currentWeek && getYear(t.date) === getYear(currentMonth))
            || getYear(t.date) < getYear(currentMonth)
          : false
      ),
    }));
  }, [footerTasks, currentWeek, currentMonth]);

  const headerProps = {
    onNextWeek,
    onPrevWeek,
    onNextMonth,
    onPrevMonth,
    currentMonth,
    currentWeek,
    selectedDate,
    showAddTaskBtn,
    onClickAddTask,
    changeWeek,
    changeDate,
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
        if (sourceTasks[source.index].draggable === false) {
          return s;
        }
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

        if (sourceColumn.tasks[source.index].draggable === false) {
          return s;
        }

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
        if (column.tasks[source.index].draggable === false) {
          return s;
        }

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

  var weekendsCheckbox = <LabeledCheckbox label="Weekends"
                           checked={showWeekend}
                           mb={0}
                           onChange={() => setShowWeekend(s => {
                             onToggleWeekend && onToggleWeekend(!s);
                             return !s;
                           })}
                         />

  return (
    <DragDropContext
      onDragEnd={result => onDragEnd(result)}
    >
      <CalendarWrapper>
        <TasksCalendarHeader
          {...headerProps}
          onResetDate={onReset}
          tabs={headerTabs}
          weekendsCheckbox={weekendsCheckbox}
          views={views}
          onClickView={onClickView}
        />
        <div className="calendar-scroll">
          <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} weekendsCheckbox={weekendsCheckbox} weekend={showWeekend} />
          {loading ? <div style={{height: 400, paddingTop: 30,}}>
            <Loading />
          </div> : <DroppableDays
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
          />}
        </div>
        {showFooterTasks ? <DroppableFooter
          tasks={state.footerTasks}
          onClickTask={onClickTask}
          onUpdateTask={(newData, {day__id, task__id, ...otherData}) => {
            _.flowRight(() => {
              onUpdateTask(newData, otherData);
            }, () => {
              if (!day__id) { return; }
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
          {...headerProps}
        /> : null}
      </CalendarWrapper>
    </DragDropContext>
  );
}

export default DraggableTasksCalendar;
