<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientsSeeder extends Seeder
{
    public function run(): void
    {
        Client::factory()->create([
            'name' => 'Demo Client',
            'email' => 'demo@cronosdental.com',
            'phone' => '+34600112233',
            'address' => 'Calle Protésica 45, Madrid',
            'medical_history' => 'Implante mandibular 2024',
            'allergies' => 'Acrílicos no médicos'
        ]);

        Client::factory(10)->create();
    }
}
