import _ from 'lodash';
import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { Row } from '../FlexboxGrid';
import CalendarDayBody from './CalendarDayBody';
import DaysBodyWrapper from './DaysBodyWrapper';
import DraggableTaskBody from './DraggableTaskBody';
import { droppableChildWrapperProps } from './styles';
import { DaysObject, onClickTaskFunc, onUpdateTaskFunc } from './types';

export type DroppableDaysProps = { days: DaysObject; selectedDate: Date; onClickTask?: onClickTaskFunc; onUpdateTask?: onUpdateTaskFunc; onClickDay: (day: any) => void; [key: string]: any; weekend?: boolean; };
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
                    {provided.placeholder}
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

export default DroppableDays;
