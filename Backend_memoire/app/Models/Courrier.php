<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courrier extends Model
{
    protected $table = 'courrier';
    
    protected $fillable = [
        'reference',
        'objet',
        'niveauConfidentiel',
        'statutCourrier',
        'fichier_joint',
        'nbre_fichiers',
    ];

    public function courrierEntrant()
    {
        return $this->hasOne(CourrierEntrant::class);
    }

    public function courrierSortant()
    {
        return $this->hasOne(CourrierSortant::class);
    }
}
