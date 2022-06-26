import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import TaskList from "./TaskList";
import TaskInputGroup from "./TaskInputGroup";

export default function TaskContainer(props) {
    let [tasks, setTasks] = useState(props.tasks);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Task List
                </h2>
            }
        >
            <Head title="Task List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <TaskInputGroup tasks={tasks} setTasks={setTasks} />
                            <TaskList tasks={tasks} setTasks={setTasks} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
