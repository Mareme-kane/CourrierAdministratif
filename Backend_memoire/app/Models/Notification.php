<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'contenu',
        'est_lue',
        'date_envoi',
        'user_id'
    ];

    protected $casts = [
        'est_lue' => 'boolean',
        'date_envoi' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}