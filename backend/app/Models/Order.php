<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'clinic_name',
        'prosthesis_type',
        'materials',
        'status',
        'delivery_date',
        'attachments',
        'digital_signature',
        '3d_model_path'
    ];
}
