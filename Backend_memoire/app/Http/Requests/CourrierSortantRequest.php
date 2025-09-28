<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourrierSortantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'objet' => 'required|string|max:255',
            'niveauConfidentiel' => 'required|in:CONFIDENTIEL,ORDINAIRE',
            'statutCourrier' => 'required|in:EN_TRAITEMENT,TRAITE,ARCHIVE,IMPUTE,EN_COURS,ENVOYE,VALIDE,NON_VALIDE',
            'destinataire' => 'required|string|max:255',
            'description'=> 'nullable|string|max:255',
            'dateValidation' => 'nullable|date',
            'dateEnvoi' => 'nullabe|date',
            'fichier_joint' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }
}
