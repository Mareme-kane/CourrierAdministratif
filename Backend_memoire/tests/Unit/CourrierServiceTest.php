<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\CourrierService;

class CourrierServiceTest extends TestCase
{
    public function test_courrier_validation()
    {
        $service = new CourrierService();
        
        $validData = [
            'objet' => 'Test Objet',
            'expediteur' => 'Test Expediteur',
            'type' => 'entrant'
        ];
        
        $this->assertTrue($service->validateCourrierData($validData));
    }

    public function test_courrier_validation_fails_with_missing_data()
    {
        $service = new CourrierService();
        
        $invalidData = [
            'objet' => '',
            'expediteur' => 'Test'
        ];
        
        $this->assertFalse($service->validateCourrierData($invalidData));
    }

    public function test_courrier_type_validation()
    {
        $service = new CourrierService();
        
        $this->assertTrue($service->isValidType('entrant'));
        $this->assertTrue($service->isValidType('sortant'));
        $this->assertFalse($service->isValidType('invalid'));
    }
}