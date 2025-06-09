<?php

namespace App\Models;

<<<<<<< HEAD
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // app/Models/Client.php
=======
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use Notifiable;

    protected $table = 'clients';

>>>>>>> feature/login
    protected $fillable = [
        'name',
        'email',
        'password',
<<<<<<< HEAD
        'address',
        'phone',
        'medical_history',
        'allergies'
    ];

=======
        'phone',
        'address'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
>>>>>>> feature/login
}
