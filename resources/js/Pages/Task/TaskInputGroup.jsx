import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { createRef } from "react";

export default function TaskInputGroup(props) {
    let tasks = props.tasks;
    let setTasks = props.setTasks;

    // Add Task
    let newTitleRef = createRef();
    let addTask = (event) => {
        event.preventDefault();
        let title = newTitleRef.current.value;
        axios
            .post("task", { title: title })
            .then((res) => {
                console.log(res.data.message);
                tasks = [...tasks, res.data.task];
                setTasks(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
        newTitleRef.current.value = null;
    };

    // Clear Tasks where done is true
    let clearDone = () => {
        tasks = tasks.filter((task) => task.is_done == false);
        axios
            .delete("task/clear")
            .then((res) => {
                console.log(res.data.message);
                setTasks(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={addTask} className="my-2">
            <div className="form-group row">
                <div className="col-sm-10 px-1">
                    <input
                        type="text"
                        className="form-control"
                        ref={newTitleRef}
                        required
                    />
                </div>
                <div className="col-sm-1 px-1">
                    <button type="submit" className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                </div>
                <div className="col-sm-1 px-1">
                    <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={clearDone}
                    >
                        <FontAwesomeIcon icon={faTrashCan} /> Clear Done
                    </button>
                </div>
            </div>
        </form>
    );
}
