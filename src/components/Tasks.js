import React from 'react';
import Task from './Task';

const Tasks = ({tasks,onDelete, toggleRemainder}) => {
    return (
    <>
        {tasks.map((task)=>(
            <Task key={task.id} task = {task} onDelete = {onDelete} toggleRemainder = {toggleRemainder} />
                
        ))}
    </>
    )
}

export default Tasks
