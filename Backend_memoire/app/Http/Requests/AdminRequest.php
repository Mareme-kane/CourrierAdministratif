<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('api')->check() && 
               auth('api')->user()->roles->pluck('nom')->contains('ADMIN');
    }

    public function rules(): array
    {
        $method = $this->getMethod();
        $userId = $this->route('id');

        switch ($method) {
            case 'POST':
                if ($this->is('*/users')) {
                    return [
                        'username' => 'required|string|unique:users,username',
                        'email_ens' => 'required|email|unique:users,email_ens',
                        'password' => 'required|string|min:6',
                        'nom_ens' => 'required|string',
                        'prenom_ens' => 'required|string',
                        'role_id' => 'required|exists:roles,id'
                    ];
                }
                
                if ($this->is('*/roles')) {
                    return [
                        'nom' => 'required|string|unique:roles,nom',
                        'description' => 'nullable|string'
                    ];
                }
                break;

            case 'PUT':
                if ($this->is('*/users/*')) {
                    return [
                        'username' => 'string|unique:users,username,' . $userId,
                        'email_ens' => 'email|unique:users,email_ens,' . $userId,
                        'nom_ens' => 'string',
                        'prenom_ens' => 'string'
                    ];
                }
                
                if ($this->is('*/roles/*')) {
                    return [
                        'nom' => 'string|unique:roles,nom,' . $userId,
                        'description' => 'nullable|string'
                    ];
                }
                break;
        }

        return [];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'Le nom d\'utilisateur est requis',
            'username.unique' => 'Ce nom d\'utilisateur existe déjà',
            'email_ens.required' => 'L\'email est requis',
            'email_ens.email' => 'Format d\'email invalide',
            'email_ens.unique' => 'Cet email existe déjà',
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
            'nom_ens.required' => 'Le nom est requis',
            'prenom_ens.required' => 'Le prénom est requis',
            'role_id.required' => 'Le rôle est requis',
            'role_id.exists' => 'Le rôle sélectionné n\'existe pas',
            'nom.required' => 'Le nom du rôle est requis',
            'nom.unique' => 'Ce nom de rôle existe déjà'
        ];
    }
}