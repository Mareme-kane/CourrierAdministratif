<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['nom' => 'AGENT_BUREAU_COURRIER', 'description' => 'Agent du bureau courrier'],
            ['nom' => 'DIRECTEUR', 'description' => 'Directeur'],
            ['nom' => 'SECRETAIRE', 'description' => 'Secrétaire du directeur général'],
            ['nom' => 'ADMIN', 'description' => 'Administrateur'],
            
        ];

        foreach ($roles as $role) {
            DB::table('roles')->insert([
                'nom' => $role['nom'],
                'description' => $role['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
