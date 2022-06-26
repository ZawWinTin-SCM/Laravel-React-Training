import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Task(props) {
    let task = props.task;
    let tasks = props.tasks;
    let setTasks = props.setTasks;
    let temp = props.temp;
    let setTemp = props.setTemp;
    let clearTemp = props.clearTemp;
    let cancelUpdate = props.cancelUpdate;

    // Toggle Done
    let toggleDone = (id) => {
        let is_done = !task.is_done;
        tasks = tasks.map((task) => {
            if (task.id == id) task.is_done = is_done;
            return task;
        });
        axios
            .put(`task/${id}`, { is_done: is_done, state: "is_done" })
            .then((res) => {
                console.log(res.data.message);
                setTasks(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Delete Task
    let deleteTask = (id) => {
        tasks = tasks.filter((task) => task.id != id);
        axios
            .delete(`task/${id}`)
            .then((res) => {
                console.log(res.data.message);
                setTasks(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Update Task
    // Change text to input text
    let changeInput = (id) => {
        if (id != temp.id) {
            temp.id = id;
            tasks.forEach((task) => {
                if (task.id == id) temp.title = task.title;
            });
            tasks = tasks.map((task) => {
                if (task.id == temp.id) task.title = temp.title;
                return task;
            });
            setTemp(temp);
        }

        tasks = tasks.map((task) => {
            task.edit = task.id == id;
            return task;
        });
        setTasks(tasks);
    };
    // Handle Text Input in update
    let handleTitleChange = (event, id) => {
        tasks = tasks.map((task) => {
            if (task.id == id) task.title = event.target.value;
            return task;
        });
        setTasks(tasks);
    };
    // Update Title
    let updateTitle = (event, task) => {
        event.preventDefault();
        tasks = tasks.map((t) => {
            if (t.id == task.id) {
                t.title = task.title;
                t.edit = false;
            }
            return t;
        });
        axios
            .put(`task/${task.id}`, { title: task.title, state: "title" })
            .then((res) => {
                console.log(res.data.message);
                setTasks(tasks);
                clearTemp();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!task.edit) {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.is_done}
                    onChange={() => toggleDone(task.id)}
                />
                <span
                    className={"cursor-pointer" + (task.is_done ? " done" : "")}
                    onDoubleClick={() => changeInput(task.id)}
                >
                    {task.title}
                </span>
                <button
                    className="btn text-danger"
                    onClick={() => deleteTask(task.id)}
                >
                    <FontAwesomeIcon icon={faEraser} />
                </button>
            </div>
        );
    }
    return (
        <form
            onSubmit={(event) => updateTitle(event, task)}
            className="d-flex justify-content-between align-items-center"
        >
            <input
                className="form-check-input"
                type="checkbox"
                checked={task.is_done}
                onChange={() => toggleDone(task.id)}
                disabled
            />
            <input
                type="text"
                className="form-control text-center w-75"
                value={task.title}
                onChange={(event) => handleTitleChange(event, task.id)}
                onBlur={cancelUpdate}
                required
            />
            <button type="button" className="btn text-danger" disabled>
                <FontAwesomeIcon icon={faEraser} />
            </button>
        </form>
    );
}
