import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBox: (taskID: string, newIsDone: boolean) => void
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   tasks,
                                                   todolistTitle,
                                                   removeTask,
                                                   changeTodolistFilter,
                                                   addTask,
                                                   changeCheckBox
                                               }): JSX.Element => {
    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeCheckBox(task.id, e.currentTarget.checked)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeCheckBoxHandler}/>
                <button onClick={() => removeTask(task.id)}>x</button>
                <span>{task.title}</span>
            </li>
        )
    })

    let [title, setTitle] = useState('')
    const addTask1 = () => {
        addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask1()
    }
    const onAllClickHandler = () => changeTodolistFilter('all')
    const onActiveClickHandler = () => changeTodolistFilter('active')
    const onCompletedClickHandler = () => changeTodolistFilter('completed')

    return (
        <div>
            <div className="todolist">
                <h3>{todolistTitle}</h3>
                <div>
                    <input
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask1}>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};


export default TodoList;