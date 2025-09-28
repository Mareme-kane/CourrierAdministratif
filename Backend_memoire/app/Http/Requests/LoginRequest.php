<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email_ens_pro' => 'required|string|email',
            'password' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'email_ens_pro.required' => 'Le nom d\'utilisateur est requis',
            'email_ens_pro.email' => 'L\'adresse email professionnelle est invalide',
            'password.required' => 'Le mot de passe est requis',
        ];
    }
}
