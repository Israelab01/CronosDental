<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\OrderController;

// Autenticación JWT
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Preflight CORS
Route::options('{any}', function() {
    return response()->json(null, 200);
})->where('any', '.*');

// Rutas protegidas con JWT
Route::middleware('auth:api')->group(function () {
    // Clients
    Route::apiResource('clients', ClientController::class);
    
    // Clinics
    Route::apiResource('clinics', ClinicController::class);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::apiResource('orders', OrderController::class);
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
