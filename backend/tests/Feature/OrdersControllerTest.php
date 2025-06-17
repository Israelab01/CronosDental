<?php

namespace Tests\Feature;

use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrdersControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Deshabilita las claves foráneas solo para SQLite (usado en testing por defecto)
        if (\DB::connection() instanceof \Illuminate\Database\SQLiteConnection) {
            \DB::statement('PRAGMA foreign_keys=OFF;');
        }
    }

    public function test_it_returns_orders_list()
    {
        Order::insert([
            [
                'client_id' => 999,
                'prosthesis_type' => 'Crown',
                'status' => 'completed',
                'delivery_date' => '2025-06-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 999,
                'prosthesis_type' => 'Implant',
                'status' => 'production',
                'delivery_date' => '2025-06-11',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        $response = $this->getJson('/api/orders');
        $response->assertStatus(200)
            ->assertJsonFragment(['prosthesis_type' => 'Crown'])
            ->assertJsonFragment(['prosthesis_type' => 'Implant']);
    }

    public function test_it_filters_orders_by_status_completed()
    {
        Order::insert([
            [
                'client_id' => 999,
                'prosthesis_type' => 'Crown',
                'status' => 'completed',
                'delivery_date' => '2025-06-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 999,
                'prosthesis_type' => 'Implant',
                'status' => 'production',
                'delivery_date' => '2025-06-11',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        $response = $this->getJson('/api/orders?status=completed');
        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'completed'])
            ->assertJsonMissing(['status' => 'production']);
    }

    public function test_it_filters_orders_by_status_production()
    {
        Order::insert([
            [
                'client_id' => 999,
                'prosthesis_type' => 'Crown',
                'status' => 'completed',
                'delivery_date' => '2025-06-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 999,
                'prosthesis_type' => 'Implant',
                'status' => 'production',
                'delivery_date' => '2025-06-11',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        $response = $this->getJson('/api/orders?status=production');
        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'production'])
            ->assertJsonMissing(['status' => 'completed']);
    }

    public function test_it_returns_empty_when_no_orders()
    {
        $response = $this->getJson('/api/orders');
        $response->assertStatus(200)
            ->assertJsonMissing(['prosthesis_type']);
    }

    public function test_it_returns_empty_when_no_orders_match_status()
    {
        Order::insert([
            [
                'client_id' => 999,
                'prosthesis_type' => 'Crown',
                'status' => 'completed',
                'delivery_date' => '2025-06-10',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        $response = $this->getJson('/api/orders?status=production');
        $response->assertStatus(200)
            ->assertJsonMissing(['status' => 'production']);
    }
}
