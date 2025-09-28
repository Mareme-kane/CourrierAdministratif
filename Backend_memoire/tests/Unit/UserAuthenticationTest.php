<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private User $testUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->testUser = User::create([
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
            'password' => Hash::make('password123')
        ]);
    }

    public function test_user_password_verification()
    {
        $this->assertTrue(Hash::check('password123', $this->testUser->password));
        $this->assertFalse(Hash::check('wrongpassword', $this->testUser->password));
    }

    public function test_jwt_token_generation()
    {
        $token = JWTAuth::fromUser($this->testUser);
        
        $this->assertNotEmpty($token);
        $this->assertIsString($token);
    }

    public function test_jwt_token_payload()
    {
        $token = JWTAuth::fromUser($this->testUser);
        $payload = JWTAuth::setToken($token)->getPayload();
        
        $this->assertEquals($this->testUser->id, $payload->get('sub'));
        $this->assertEquals('678G8D8F', $payload->get('username'));
        $this->assertEquals([], $payload->get('roles'));
    }

    public function test_jwt_token_with_roles()
    {
        $role = Role::create(['nom' => 'admin']);
        $this->testUser->roles()->attach($role);
        
        $token = JWTAuth::fromUser($this->testUser);
        $payload = JWTAuth::setToken($token)->getPayload();
        
        $this->assertContains('admin', $payload->get('roles'));
    }

    public function test_user_authentication_with_username()
    {
        $credentials = [
            'username' => '678G8D8F',
            'password' => 'password123'
        ];

        $token = auth()->attempt($credentials);
        
        $this->assertNotFalse($token);
        $this->assertEquals($this->testUser->id, auth()->user()->id);
    }

    public function test_user_authentication_with_email()
    {
        $credentials = [
            'email_ens' => 'aissatou1979@yahoo.fr',
            'password' => 'password123'
        ];

        // Simuler l'authentification par email
        $user = User::where('email_ens', $credentials['email_ens'])->first();
        $this->assertNotNull($user);
        $this->assertTrue(Hash::check($credentials['password'], $user->password));
    }

    public function test_failed_authentication()
    {
        $credentials = [
            'username' => '678G8D8F',
            'password' => 'wrongpassword'
        ];

        $token = auth()->attempt($credentials);
        
        $this->assertFalse($token);
    }
}