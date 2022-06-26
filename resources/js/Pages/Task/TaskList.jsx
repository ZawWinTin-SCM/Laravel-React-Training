import React, { useState, useEffect } from "react";

import Task from "./Task";

export default function TaskList(props) {
    let tasks = props.tasks;
    let setTasks = props.setTasks;

    // Temp Data for Update
    let [temp, setTemp] = useState({
        id: "",
        title: "",
    });

    // Clear Temp
    let clearTemp = () => {
        temp.id = "";
        temp.title = "";
        setTemp(temp);
    };

    let cancelUpdate = () => {
        if (temp.id != "") {
            tasks = tasks.map((task) => {
                if (task.id == temp.id) task.title = temp.title;
                return task;
            });
        }
        tasks = tasks.map((task) => {
            task.edit = false;
            return task;
        });
        setTasks(tasks);
        clearTemp();
    };

    // Detect esc key in update
    const escFunction = (event) => {
        if (event.keyCode === 27) {
            cancelUpdate();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escFunction);
        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    });

    return (
        <ul className="list-group list-group-flush task-list">
            {tasks.length > 0 ? (
                tasks.map((task) => {
                    return (
                        <li key={task.id} className="list-group-item">
                            <Task
                                task={task}
                                tasks={tasks}
                                setTasks={setTasks}
                                temp={temp}
                                setTemp={setTemp}
                                clearTemp={clearTemp}
                                cancelUpdate={cancelUpdate}
                            />
                        </li>
                    );
                })
            ) : (
                <li key="0" className="list-group-item">
                    <span className="text-muted">There are no tasks.</span>
                </li>
            )}
        </ul>
    );
}
