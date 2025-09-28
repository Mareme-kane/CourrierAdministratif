<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourrierRequest extends FormRequest
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
            'reference'  => 'required|string|max:255',
            'objet'  => 'required|string|max:255',
            'niveauConfidentiel'  => 'required|string|max:255',
            'statutCourrier'  => 'required|string|max:255',
            'fichier_joint' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048', // 2MB max
        ];
    }
}
