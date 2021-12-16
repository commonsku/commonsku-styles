import { CalendarTaskProps, } from '../Task';

export type ACTIONS = 'TOGGLE_CHECKBOX' | 'DROP';
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

export type NewCalendarTaskProps = CalendarTaskProps & {__id__: string};
export type Day = { __id__: string; day: Date; tasks: Array<NewCalendarTaskProps>; };
export type DaysObject = { [key: string]: Day };
