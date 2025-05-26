<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Clinic;

class ClinicApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_lists_clinics()
    {
        Clinic::factory()->count(2)->create();

        $response = $this->getJson('/api/clinics');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    /** @test */
    public function it_creates_a_clinic()
    {
        $data = [
            'nombre' => 'Clínica Test',
            'email' => 'test@clinic.com',
            'telefono' => '123456789',
            'direccion' => 'Calle Falsa 123'
        ];

        $response = $this->postJson('/api/clinics', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['nombre' => 'Clínica Test']);
        $this->assertDatabaseHas('clinics', $data);
    }

    /** @test */
    public function it_updates_a_clinic()
    {
        $clinic = Clinic::factory()->create();

        $data = [
            'nombre' => 'Clínica Actualizada',
            'email' => 'nuevo@clinic.com',
            'telefono' => '987654321',
            'direccion' => 'Avenida Nueva 456'
        ];

        $response = $this->putJson("/api/clinics/{$clinic->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment(['nombre' => 'Clínica Actualizada']);
        $this->assertDatabaseHas('clinics', $data);
    }
}
