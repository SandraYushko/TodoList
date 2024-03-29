import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './TodoList.module.css'
import CheckBox from './components/CheckBox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistID:string
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (todolistID:string, taskID: string) => void
    changeTodolistFilter: (todolistID:string, filter: FilterValuesType) => void
    addTask: (todolistID:string, title: string) => void
    changeCheckBox: (todolistID: string, taskID: string, newIsDone: boolean) => void
    filter: FilterValuesType
    deleteTodolist: (todolistID:string) => void
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   todolistID,
                                                   tasks,
                                                   todolistTitle,
                                                   removeTask,
                                                   changeTodolistFilter,
                                                   addTask,
                                                   changeCheckBox,
                                                   filter,
                                                   deleteTodolist
                                               }): JSX.Element => {

    const changeCheckBoxHandler = (task:string, isDone:boolean) => {
        changeCheckBox(todolistID, task, isDone)
    }

    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id} className={task.isDone===true ? styles.isDone : ""}>
                <CheckBox
                    checked={task.isDone}
                    callBack={(isDone:boolean)=>{changeCheckBoxHandler(task.id, isDone)}}
                />
                <button onClick={() => removeTask(todolistID, task.id)}>x</button>
                <span>{task.title}</span>
            </li>
        )
    })

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string|null>(null)

    const addTask1 = () => {
        if (title.trim()) {
            addTask(todolistID, title.trim())
            setTitle('')
        }
        else setError("Title is required!")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask1()
    }
    const onAllClickHandler = () => changeTodolistFilter(todolistID, 'all')
    const onActiveClickHandler = () => changeTodolistFilter(todolistID,'active')
    const onCompletedClickHandler = () => changeTodolistFilter(todolistID,'completed')
    const deleteTodolistHandler = () => {deleteTodolist(todolistID)}

    return (
        <div>
            <div className="todolist">
                <h3>{todolistTitle}<button onClick={deleteTodolistHandler}>x</button></h3>
                <div>
                    <input
                        className={error ? styles.error : ""}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask1}>+</button>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button className={filter==="all" ? styles.activeFilter : ""} onClick={onAllClickHandler}>All</button>
                    <button className={filter==="active" ? styles.activeFilter : ""} onClick={onActiveClickHandler}>Active</button>
                    <button className={filter==="completed" ? styles.activeFilter : ""} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};


export default TodoList;







// const TodoList: React.FC<TodoListPropsType> = ({
//                                                    tasks,
//                                                    todolistTitle,
//                                                    removeTask,
//                                                    changeTodolistFilter,
//                                                    addTask,
//                                                    changeCheckBox,
//                                                    filter
//                                                }): JSX.Element => {
//
//     const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
//         const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
//             changeCheckBox(task.id, e.currentTarget.checked)
//         }
//
//         return (
//             <li key={task.id} className={task.isDone===true ? styles.isDone : ""}>
//                 <input type="checkbox" checked={task.isDone} onChange={changeCheckBoxHandler}/>
//                 <button onClick={() => removeTask(task.id)}>x</button>
//                 <span>{task.title}</span>
//             </li>
//         )
//     })
