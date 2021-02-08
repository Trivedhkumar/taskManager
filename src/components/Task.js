import {FaTimes} from "react-icons/fa"
const Task = ({task,onDelete,toggleRemainder}) => {
    return (
        <div className={`task ${task.remainder ? "reminder" : ""}`} 
        onDoubleClick={()=>toggleRemainder(task.id)}
        
        >
            <h3 
            onClick = {()=> onDelete(task.id)}
        >{task.text}{' '} {<FaTimes style={{color:"red",cursor:"pointer"}} />}</h3>
            <p>{task.day}</p>
        </div>
    )   
}

export default Task
