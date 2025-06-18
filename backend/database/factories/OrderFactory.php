<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition()
    {
        return [
            'client_id' => \App\Models\Client::factory(),
            'prosthesis_type' => $this->faker->randomElement(['Crown', 'Implant', 'Bridge']),
            'status' => $this->faker->randomElement(['completed', 'production']),
            'delivery_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'attachments' => null,
            'digital_signature' => null,
            '3d_model_path' => null,
        ];
    }
}
