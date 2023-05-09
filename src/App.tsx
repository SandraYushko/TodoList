import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todolistTitle: string = "What to learn?"
    let [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ])

    //к нам приходит taskID=task.id, удаляем таску с этим ID
    const removeTask = (taskID: string) => {
        tasks = tasks.filter((task) => task.id !== taskID)
        setTasks(tasks)
    }

    function addTask(title:string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks=[newTask, ...tasks]
        setTasks(newTasks)
    }

    //нажимаем кнопки "all" | "active" | "completed" и удаляем строки
    const [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForTodolist:Array<TaskType> = []
    if (filter==="all"){
        tasksForTodolist=tasks
    }
    if (filter==="active"){
        tasksForTodolist=tasks.filter(t=>!t.isDone) //сокращенная запись !t.isDone = (t.isDone === false)
    }
    if (filter==="completed"){
        tasksForTodolist=tasks.filter(t=>t.isDone)  //сокращенная запись t.isDone = (t.isDone === true)
    }


    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }



    return (
        <div className="App">
            <TodoList
                todolistTitle={todolistTitle}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;


