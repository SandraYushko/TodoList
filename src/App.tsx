import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const tasks: TaskType[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 1, title: "JS/ES6/TS", isDone: true},
        {id: 1, title: "React", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title="What to learn?"/>

        </div>
    );
}

export default App;
