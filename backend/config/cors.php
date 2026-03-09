<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */
    
    /**
     * paths se agregan todas las rutas de la API a las cuales se les aplicará la 
     * configuración de CORS, en este caso se aplicará a todas las rutas que comiencen 
     * con api/ y a la ruta sanctum/csrf-cookie que es utilizada por Laravel Sanctum 
     * para obtener el token CSRF necesario para la autenticación de API.
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    /**
     * en allowed_origins se agrega todos los dominios desde los cuales se 
     * permitirá el acceso a la API, en este caso se permite el acceso desde 
     * el dominio del frontend configurado en el archivo .env (http://localhost:5173) y 
     * también desde http://
     */
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,
    /**
     * supports_credentials se establece en true para permitir el envío de cookies y 
     * encabezados de autenticación en las solicitudes CORS, lo cual es necesario para 
     * la autenticación de API utilizando Laravel Sanctum.
     */
    'supports_credentials' => true,

];
