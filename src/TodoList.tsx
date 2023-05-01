import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    remuveTask:(taskID:number)=>void
    changeFilter:(filter:filterValuesTupe)=>void
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   tasks,
                                                   title,
                                                   remuveTask,
                                                   changeFilter
                                               }) => {

    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>remuveTask(task.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <div className="todolist">
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;