<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/task', [TaskController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('task.index');
Route::post('/task', [TaskController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('task.store');
Route::put('/task/{id}', [TaskController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('task.update');
Route::delete('/task/{id}', [TaskController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('task.destroy');
Route::delete('/task/clear', [TaskController::class, 'clearDone'])
    ->middleware(['auth', 'verified'])
    ->name('task.clear');
