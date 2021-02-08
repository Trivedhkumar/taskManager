import {useState,useEffect} from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTask";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import About from './components/About';
function App() {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(true);

useEffect(()=>{
  const getTasks = async ()=>{
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }
  getTasks();

},[])
const fetchTasks = async ()=>{
  const res = await fetch("http://localhost:5000/tasks");
  const data = res.json();
  return data;
}
const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = res.json();
  return data;
}

  //Add Task
  const addTask = async (task)=>{
    // const id = Math.floor(Math.random() * 10000) +1;
    // const newTask = {id,...task};
    // setTasks([...tasks,newTask]);
    const res = await fetch(`http://localhost:5000/tasks`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify(task)
    })
    const data = await res.json();
    setTasks([...tasks,data])


  }


  // Delete Task
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"DELETE"
    })
    setTasks(tasks.filter((task)=>{
      return task.id !== id;
    }))
  }

  //Remainder
  const toggleRemainder = async (id)=>{
    const tasktoToggle = await fetchTask(id);
    const updTask = {
      ...toggleRemainder,
      remainder:!tasktoToggle.remainder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(updTask)
    })
    const data = await res.json();

    setTasks(tasks.map((task)=>task.id === id ? {...task,remainder:data.remainder} : task));
  }
  return (
    <Router>
    <div className="container">
      <Header
      onAdd = {()=>setShowAddTask(!showAddTask)}
      showAdd = {showAddTask} />
    
    <Route path="/" exact
    render = {(props)=>(
      <>
        {showAddTask && <AddTasks addTask = {addTask}  />}
    {
      tasks.length > 0 ? 
      <Tasks tasks={tasks} onDelete = {deleteTask} toggleRemainder={toggleRemainder}/>
      :"No Tasks To Show"
    }
      </>
    )}
    />
    <Route path="/about" component={About} />
    <Footer />
    </div>
    </Router>
  );
}

export default App;
