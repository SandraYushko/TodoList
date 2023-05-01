import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const title:string = "What to learn?"

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS/ES6/TS", isDone: true},
            {id: 3, title: "React", isDone: false},
        ]
    )
const changeFilter=

    type filterValuesTupe = "all"|"active"|"completed"
    const [filter, setFilter] = useState<filterValuesTupe>("all")

const getFiltredTasks = (tasks:Array<TaskType>, filter:filterValuesTupe):Array<TaskType>{
switch (filter){
    case "active":
        return tasks.filter(t=>!t.isDone)
    case "completed":
        return tasks.filter(t=>t.isDone)
    default:
        return tasks
}
    }




    const removeTask = (taskID:number) => {
        const updatedTasks=tasks.filter((task)=>task.id !== taskID)
        setTasks(updatedTasks)
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={title}
                remuveTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;


