<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Client;

class RegisterApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_registers_a_client_with_valid_data()
    {
        $data = [
            'name' => 'Cliente Test',
            'email' => 'cliente@email.com',
            'password' => '12345678',
            'password_confirmation' => '12345678',
            'address' => 'Calle Prueba 123',
            'phone' => '123456789'
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['email' => 'cliente@email.com']);

        $this->assertDatabaseHas('clients', [
            'email' => 'cliente@email.com',
            'name' => 'Cliente Test',
            'address' => 'Calle Prueba 123',
            'phone' => '123456789'
        ]);
    }

    /** @test */
    public function it_fails_if_email_is_already_taken()
    {
        Client::factory()->create([
            'email' => 'cliente@email.com',
            'name' => 'Cliente Existente',
            'address' => 'Calle Existente 456',
            'phone' => '987654321'
        ]);

        $data = [
            'name' => 'Otro Cliente',
            'email' => 'cliente@email.com',
            'password' => '12345678',
            'password_confirmation' => '12345678',
            'address' => 'Otra Calle 456',
            'phone' => '111222333'
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    /** @test */
    public function it_requires_all_fields()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'password', 'address', 'phone']);
    }
}
