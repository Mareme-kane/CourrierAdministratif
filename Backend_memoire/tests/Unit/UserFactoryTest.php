<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserFactoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_factory_creates_valid_user()
    {
        $user = User::factory()->create([
            'ien_ens' => '678G8D8F',
            'prenom_ens' => 'Aissatou',
            'nom_ens' => 'NIANG',
            'email_ens' => 'aissatou1979@yahoo.fr',
            'username' => '678G8D8F'
        ]);

        $this->assertDatabaseHas('users', [
            'ien_ens' => '678G8D8F',
            'prenom_ens' => 'Aissatou',
            'nom_ens' => 'NIANG',
            'email_ens' => 'aissatou1979@yahoo.fr'
        ]);
    }

    public function test_user_factory_creates_multiple_users()
    {
        $users = User::factory()->count(3)->create();

        $this->assertCount(3, $users);
        $this->assertEquals(3, User::count());
    }

    public function test_user_factory_with_specific_data()
    {
        $userData = [
            'ien_ens' => '678G8D8F',
            'prenom_ens' => 'Aissatou',
            'nom_ens' => 'NIANG',
            'sexe_ens' => 'F',
            'date_nais' => '2020-08-25',
            'lieu_nais' => 'Doundodji',
            'CNI_ens' => '2714198500861',
            'matricule_ens' => '638019/C',
            'username' => '678G8D8F',
            'email_ens' => 'aissatou1979@yahoo.fr',
            'email_ens_pro' => 'aissatou.niang32@education.sn'
        ];

        $user = User::factory()->create($userData);

        foreach ($userData as $key => $value) {
            $this->assertEquals($value, $user->$key);
        }
    }
}