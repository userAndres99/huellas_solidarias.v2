<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas para la autenticación de usuarios utilizando Laravel Sanctum
require __DIR__.'/auth.php';
