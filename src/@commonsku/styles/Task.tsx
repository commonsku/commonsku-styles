import styled from 'styled-components'
import React from 'react'
import {LabeledCheckbox} from './Input'

const Task = (props: React.PropsWithChildren<{taskName:string, date:string, done?:boolean, assignee?: string, taskBody: string}>) => {
  const TaskLabel  = styled.div`display: flex;`
  const TaskName   = styled.div`flex-grow: 1;`
  const StyledTask = styled.div`margin-bottom: 1.5em;`
  const TaskBody   = styled.div`margin-left:34px;`
  return <StyledTask>
           <LabeledCheckbox label={<TaskLabel>
                                     <TaskName>{props.taskName}</TaskName>
                                     <div>{props.date}</div>
                                   </TaskLabel>} checked={false}/>
           <TaskBody>{props.taskBody}</TaskBody>
           <div className="task-metadata">
             {typeof props.assignee !== "undefined" ? "for " + props.assignee! : null}
             {typeof props.assignee !== "undefined" ? "on " : null} 
           </div>
         </StyledTask>
}

export {Task};
