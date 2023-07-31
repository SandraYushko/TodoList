import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskAssotType = {
    [key:string]:TaskType[]
}

function App() {
    let todolistID1=v1()
    let todolistID2=v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to bay', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskAssotType>({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS/ES6/TS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'HTML&CSS2', isDone: true},
                {id: v1(), title: 'JS/ES6/TS2', isDone: true},
                {id: v1(), title: 'React2', isDone: false},
                {id: v1(), title: 'Rest API2', isDone: false},
                {id: v1(), title: 'GraphQL2', isDone: false}
            ]
        }
    )

    // изменяем значения чекбоксов при нажатии
    const changeCheckBox = (taskID: string, newIsDone: boolean) => {
       /* let currentTask = tasks.find((t) => t.id === taskID) //находим нужную строку
        if (currentTask) {
            currentTask.isDone = newIsDone //заменяем isDone на противоположное значение (=мутируем массив tasks)
            setTasks([...tasks]) //перезаливаем мутированный массив по новой ссылке (при пом. деструктуризации)
        }*/
    }
    //к нам приходит taskID=task.id, удаляем таску с этим ID
    const removeTask = (todolistID:string, taskID: string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(task => task.id !== taskID)})
    }
    const addTask = (title: string) => {
       /* let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)*/
    }
    const changeTodolistFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: filter} : el))
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist: TaskType[] = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone) //сокращенная запись !t.isDone = (t.isDone === false)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone)  //сокращенная запись t.isDone = (t.isDone === true)
                }
                return (
                    <TodoList
                        key={el.id}
                        todolistID={el.id}
                        todolistTitle={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeCheckBox={changeCheckBox}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;


