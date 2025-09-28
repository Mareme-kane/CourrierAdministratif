<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class ConsommationAPIController extends Controller
{
    public function index()
    {
        try {
            $response = Http::withoutVerifying()->timeout(10)->post('https://apps.education.sn/C_personnel_api/getIENlist_by_struct', [
                'code_str' => 1934180100,
                'type' => 'personnel'
            ]);

            $apiData = $response->json();
            $savedUsers = [];

            // Debug: voir la structure des données
            if (isset($apiData) && is_array($apiData)) {
                foreach ($apiData as $userData) {
                    $user = User::updateOrCreate(
                        ['username' => $userData['ien_ens'] ?? uniqid('user_')],
                        [
                            'ien_ens' => $userData['ien_ens'] ?? '',
                            'prenom_ens' => $userData['prenom_ens'] ?? '',
                            'nom_ens' => $userData['nom_ens'] ?? '',
                            'sexe_ens' => $userData['sexe_ens'] ?? 'M',
                            'date_nais' => $userData['date_nais'] ?? '1990-01-01',
                            'lieu_nais' => $userData['lieu_nais'] ?? '',
                            'CNI_ens' => $userData['CNI_ens'] ?? rand(100000000, 999999999),
                            'matricule_ens' => $userData['matricule_ens'] ?? '',
                            'email_ens' => $userData['email_ens'] ?? $userData['ien_ens'] . '@education.sn',
                            'email_ens_pro' => $userData['email_ens_pro'] ?? $userData['ien_ens'] . '@pro.sn',
                            'password' => Hash::make('password123')
                        ]
                    );

                    $savedUsers[] = $user;
                }
            }

            // Affecter les rôles de manière aléatoire
            $this->assignRandomRoles($savedUsers);

            return response()->json([
                'status' => 'success',
                'message' => count($savedUsers) . ' utilisateurs synchronisés',
                'api_data_structure' => array_keys($apiData),
                'first_user_data' => isset($apiData[0]) ? $apiData[0] : null,
                'saved_users' => count($savedUsers)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function assignRolesToAllUsers()
    {
        try {
            $usersWithoutRoles = User::doesntHave('roles')->get();

            if ($usersWithoutRoles->isEmpty()) {
                return response()->json([
                    'status' => 'info',
                    'message' => 'Tous les utilisateurs ont déjà des rôles assignés'
                ]);
            }

            $this->assignRandomRoles($usersWithoutRoles->toArray());

            return response()->json([
                'status' => 'success',
                'message' => 'Rôles assignés à ' . $usersWithoutRoles->count() . ' utilisateurs'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function assignRandomRoles($users)
    {
        $roles = ['DIRECTEUR', 'SECRETAIRE', 'AGENT_BUREAU_COURRIER'];
        $adminAssigned = false;

        foreach ($users as $user) {
            if (!$adminAssigned) {
                $adminRole = Role::where('nom', 'ADMIN')->first();
                if ($adminRole) {
                    $user->roles()->syncWithoutDetaching([$adminRole->id]);
                    $adminAssigned = true;
                    continue;
                }
            }

            $randomRole = $roles[array_rand($roles)];
            $role = Role::where('nom', $randomRole)->first();

            if ($role) {
                $user->roles()->syncWithoutDetaching([$role->id]);
            }
 }
}
}
