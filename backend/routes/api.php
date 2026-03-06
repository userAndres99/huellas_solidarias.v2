<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

// Endpoint de verificacion para ver si la API responde.
Route::get('/health', function () {
    // Bandera de estado para la conexion a base de datos.
    $dbOk = false;

    try {
        // si esto funciona, Laravel se conecto a MySQL.
        DB::select('select 1');
        $dbOk = true;
    } catch (\Throwable $e) {
        // Si falla la consulta, dejamos el estado en error.
        $dbOk = false;
    }

    // Respuesta JSON para comprobar API + DB desde navegador.
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
        'db' => $dbOk ? 'connected' : 'error',
        'timestamp' => now()->toISOString(),
    ]);
});
