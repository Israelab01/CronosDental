<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;

Route::post('/register', [ClientController::class, 'store']);

// Mantén esta ruta OPTIONS al final
Route::options('{any}', function() {
    return response()->json(null, 200);
})->where('any', '.*');
