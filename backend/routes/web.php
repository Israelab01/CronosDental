<?php

use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\ClientController;
=======
use App\Http\Controllers\AuthController;
>>>>>>> feature/login


Route::get('/', function () {
    return view('welcome');
});

<<<<<<< HEAD
=======
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
>>>>>>> feature/login
