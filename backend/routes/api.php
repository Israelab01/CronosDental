<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\OrderController;

Route::post('/register', [ClientController::class, 'store']);

Route::options('{any}', function() {
    return response()->json(null, 200);
})->where('any', '.*');

Route::apiResource('clinics', ClinicController::class);

Route::get('/orders', [OrderController::class, 'index']);
Route::apiResource('orders', OrderController::class);

