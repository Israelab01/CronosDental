<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    protected $table = 'clinics'; // explícito aunque por defecto

    protected $primaryKey = 'id'; // por defecto, pero asegúrate

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'direccion'
    ];
}


