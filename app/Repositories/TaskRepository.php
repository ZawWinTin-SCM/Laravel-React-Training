<?php

namespace App\Repositories;

use Throwable;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskRepository
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function getAll()
    {
        $tasks = Task::ownTask()->get();

        return Inertia::render('Task/TaskContainer', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\PropertyPost
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $task = Task::create([
                'title' => $request->title,
                'user_id' => auth()->id(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Task is created successfully.',
                'task' => $task,
            ], 200);
        } catch (Throwable $th) {
            Log::error(__CLASS__ . '::' . __FUNCTION__ . '[line: ' . __LINE__ . '][Task creating failed] Message: ' . $th->getMessage());
            DB::rollBack();

            return response()->json([
                'message' => 'Task cannot be created',
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \App\Models\PropertyPost | \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::ownTask()->findOrFail($id);

        DB::beginTransaction();
        try {
            $taskParam = [];
            switch ($request->state) {
                case Task::UPDATABLE_STATE['TITLE']: 
                    $taskParam['title'] = $request->title;
                    break;
                case Task::UPDATABLE_STATE['IS_DONE']:
                    $taskParam['is_done'] = $request->is_done;
                    break;
                default:
                    break;
            }
            $task->update($taskParam);

            DB::commit();

            return response()->json([
                'message' => 'Task is updated successfully.',
                'task' => $task,
            ], 200);
        } catch (Throwable $th) {
            Log::error(__CLASS__ . '::' . __FUNCTION__ . '[line: ' . __LINE__ . '][Task updating failed] Message: ' . $th->getMessage());
            DB::rollBack();

            return response()->json([
                'message' => 'Task cannot be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::ownTask()->findOrFail($id);
        $task->delete();

        return response()->json([
            'message' => 'Task is deleted successfully.',
        ], 200);
    }

    /**
     * Remove the specified resources from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function clearDone()
    {
        info('hello');
        $tasks = Task::ownTask()->done();
        $tasks->delete();

        return response()->json([
            'message' => 'Doned Tasks are cleared.',
        ], 200);
    }
}
