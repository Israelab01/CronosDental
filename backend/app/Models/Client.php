<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // app/Models/Client.php
    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'phone',
        'medical_history',
        'allergies'
    ];

}
