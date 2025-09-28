<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserModelTest extends TestCase
{
    use RefreshDatabase;

    private array $userData = [
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
        'email_ens_pro' => 'aissatou.niang32@education.sn',
        'password' => 'password123'
    ];

    public function test_user_can_be_created()
    {
        $user = User::create($this->userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('678G8D8F', $user->ien_ens);
        $this->assertEquals('Aissatou', $user->prenom_ens);
        $this->assertEquals('NIANG', $user->nom_ens);
        $this->assertEquals('aissatou1979@yahoo.fr', $user->email_ens);
    }

    public function test_user_fillable_attributes()
    {
        $user = new User();
        $expectedFillable = [
            'ien_ens',
            'prenom_ens',
            'nom_ens',
            'sexe_ens',
            'date_nais',
            'lieu_nais',
            'CNI_ens',
            'matricule_ens',
            'username',
            'email_ens',
            'email_ens_pro',
            'password',
        ];

        $this->assertEquals($expectedFillable, $user->getFillable());
    }

    public function test_user_hidden_attributes()
    {
        $user = new User();
        $expectedHidden = ['password', 'remember_token'];

        $this->assertEquals($expectedHidden, $user->getHidden());
    }

    public function test_password_is_hashed()
    {
        $user = User::create($this->userData);

        $this->assertNotEquals('password123', $user->password);
        $this->assertTrue(password_verify('password123', $user->password));
    }

    public function test_user_jwt_identifier()
    {
        $user = User::create($this->userData);

        $this->assertEquals($user->id, $user->getJWTIdentifier());
    }

    public function test_user_jwt_custom_claims_without_roles()
    {
        $user = User::create($this->userData);
        $claims = $user->getJWTCustomClaims();

        $this->assertArrayHasKey('roles', $claims);
        $this->assertArrayHasKey('username', $claims);
        $this->assertEquals('678G8D8F', $claims['username']);
        $this->assertEquals([], $claims['roles']);
    }

    public function test_user_can_have_roles()
    {
        $user = User::create($this->userData);
        $role = Role::create(['nom' => 'admin']);
        
        $user->roles()->attach($role);

        $this->assertTrue($user->roles->contains($role));
        $this->assertEquals('admin', $user->roles->first()->nom);
    }

    public function test_user_jwt_custom_claims_with_roles()
    {
        $user = User::create($this->userData);
        $role1 = Role::create(['nom' => 'admin']);
        $role2 = Role::create(['nom' => 'user']);
        
        $user->roles()->attach([$role1->id, $role2->id]);
        $claims = $user->getJWTCustomClaims();

        $this->assertContains('admin', $claims['roles']);
        $this->assertContains('user', $claims['roles']);
        $this->assertEquals('678G8D8F', $claims['username']);
    }

    public function test_user_casts()
    {
        $user = User::create(array_merge($this->userData, [
            'email_verified_at' => '2025-08-14 23:04:15'
        ]));

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $user->email_verified_at);
    }

    public function test_user_required_fields_validation()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        User::create([
            'prenom_ens' => 'Aissatou'
        ]);
    }

    public function test_user_unique_constraints()
    {
        User::create($this->userData);

        $this->expectException(\Illuminate\Database\QueryException::class);
        
        User::create($this->userData);
    }
}