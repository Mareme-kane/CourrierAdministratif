<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourrierEntrant extends Model
{
    protected $table = 'courrier_entrant';
    
    protected $fillable = [
        'courrier_id',
        'expediteur',
        'dateArrivee',
    ];

    public function courrier()
    {
        return $this->belongsTo(Courrier::class);
    }
}
