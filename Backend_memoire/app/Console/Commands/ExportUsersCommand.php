<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class ExportUsersCommand extends Command
{
    protected $signature = 'export:users';
    protected $description = 'Export users and user_roles to CSV files';

    public function handle()
    {
        $this->exportUsers();
        $this->exportUserRoles();
        $this->info('Export completed successfully!');
    }

    private function exportUsers()
    {
        $users = User::all();
        $csvPath = database_path('seeders/data/users.csv');
        
        $file = fopen($csvPath, 'w');
        fputcsv($file, ['id', 'ien_ens', 'prenom_ens', 'nom_ens', 'sexe_ens', 'date_nais', 'lieu_nais', 'CNI_ens', 'matricule_ens', 'username', 'email_ens', 'email_ens_pro', 'created_at', 'updated_at']);
        
        foreach ($users as $user) {
            fputcsv($file, [
                $user->id,
                $user->ien_ens,
                $user->prenom_ens,
                $user->nom_ens,
                $user->sexe_ens,
                $user->date_nais,
                $user->lieu_nais,
                $user->CNI_ens,
                $user->matricule_ens,
                $user->username,
                $user->email_ens,
                $user->email_ens_pro,
                $user->created_at,
                $user->updated_at
            ]);
        }
        
        fclose($file);
        $this->info('Users exported to: ' . $csvPath);
    }

    private function exportUserRoles()
    {
        $userRoles = DB::table('user_roles')
            ->join('users', 'user_roles.user_id', '=', 'users.id')
            ->join('roles', 'user_roles.role_id', '=', 'roles.id')
            ->select('user_roles.user_id', 'roles.nom as role_name')
            ->get();
        
        $csvPath = database_path('seeders/data/user_roles.csv');
        
        $file = fopen($csvPath, 'w');
        fputcsv($file, ['user_id', 'role_name']);
        
        foreach ($userRoles as $userRole) {
            fputcsv($file, [$userRole->user_id, $userRole->role_name]);
        }
        
        fclose($file);
        $this->info('User roles exported to: ' . $csvPath);
    }
}
