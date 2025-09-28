<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\UserService;

class UserServiceTest extends TestCase
{
    public function test_user_creation()
    {
        $service = new UserService();
        
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123'
        ];
        
        $this->assertTrue($service->validateUserData($userData));
    }

    public function test_email_validation()
    {
        $service = new UserService();
        
        $this->assertTrue($service->isValidEmail('test@example.com'));
        $this->assertFalse($service->isValidEmail('invalid-email'));
    }

    public function test_password_strength()
    {
        $service = new UserService();
        
        $this->assertTrue($service->isStrongPassword('Password123!'));
        $this->assertFalse($service->isStrongPassword('weak'));
    }
}