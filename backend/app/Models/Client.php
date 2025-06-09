<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use Notifiable;

    protected $table = 'clients';

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        // 'medical_history',
        // 'allergies'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
