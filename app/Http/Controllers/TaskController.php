<?php

namespace App\Http\Controllers;

use App\Repositories\TaskRepository;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->taskRepository->getAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TaskStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TaskStoreRequest $request)
    {
        return $this->taskRepository->store($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TaskUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TaskUpdateRequest $request, $id)
    {
        return $this->taskRepository->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->taskRepository->destroy($id);
    }

    /**
     * Remove the specified resources from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function clearDone()
    {
        return $this->taskRepository->clearDone();
    }
}
