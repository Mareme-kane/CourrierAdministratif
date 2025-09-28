<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourrierEntrantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'objet' => 'required|string|max:255',
            'niveauConfidentiel' => 'required|in:ORDINAIRE,CONFIDENTIEL',
            'expediteur' => 'required|string|max:255',
            'dateArrivee' => 'required|date',
            // 'fichier_joint' => 'required|mimes:pdf,jpg,png|max:2048',
            'fichier_joint' => 'required|string|max:255',
            'nbre_fichiers' => 'required|integer|min:0',
        ];
    }
}
