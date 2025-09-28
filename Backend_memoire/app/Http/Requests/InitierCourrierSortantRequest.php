<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InitierCourrierSortantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'objet' => 'required|string|max:255',
            'destinataire' => 'required|string|max:255',
            'niveauConfidentiel' => 'nullable|in:ORDINAIRE,CONFIDENTIEL,SECRET',
            'secretaire_email' => 'required|email|exists:users,email',
        ];
    }

    public function messages(): array
    {
        return [
            'objet.required' => 'L\'objet du courrier est requis',
            'destinataire.required' => 'Le destinataire est requis',
            'secretaire_email.required' => 'L\'email du secrétaire est requis',
            'secretaire_email.exists' => 'Le secrétaire spécifié n\'existe pas',
        ];
    }
}