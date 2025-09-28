<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourrierEntrantPatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'objet' => 'sometimes|string|max:255',
            'niveauConfidentiel' => 'sometimes|in:ORDINAIRE,CONFIDENTIEL',
            'expediteur' => 'sometimes|string|max:255',
            'dateArrivee' => 'sometimes|date',
            'fichier_joint' => 'sometimes|string|max:255',
            'nbre_fichiers' => 'sometimes|integer|min:0',
        ];
    }
}