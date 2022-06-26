<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'is_done',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_done' => 'boolean',
    ];

    public const UPDATABLE_STATE = [
        'TITLE' => 'title',
        'IS_DONE' => 'is_done',
    ];
 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isOwnTask()
    {
        return auth()->id() === $this->user_id;
    }

    public function scopeOwnTask($query)
    {
        return $query->where('user_id', auth()->id());
    }

    public function scopeDone($query)
    {
        return $query->where('is_done', 1);
    }
}
