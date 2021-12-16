import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Col } from '../FlexboxGrid';
import { CalendarTask, } from '../Task';
import { draggableChildWrapperProps } from './styles';
import { NewCalendarTaskProps, onClickTaskFunc, onUpdateTaskFunc } from './types';

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

export default DraggableTaskBody;
