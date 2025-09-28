<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourrierSortant extends Model
{
    protected $table = 'courrier_sortant';

    protected $fillable = [
        'courrier_id',
        'destinataire',
        'dateEnvoi',
        'dateValidation',
    ];

    protected $casts = [
        'dateEnvoi' => 'datetime',
        'dateValidation' => 'datetime',
    ];

    public function courrier()
    {
        return $this->belongsTo(Courrier::class);
    }
}
