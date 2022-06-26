<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $task = Task::ownTask()->find($this->id);

        return !is_null($task);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => [Rule::requiredIf(($this->state === Task::UPDATABLE_STATE['TITLE'])), 'max:190'],
            'is_done' => [Rule::requiredIf(($this->state === Task::UPDATABLE_STATE['IS_DONE'])), 'boolean'],
            'state' => ['required', Rule::in(Task::UPDATABLE_STATE)],
        ];
    }
}
