<?php

return [
    // Rutas a las que se les aplicara CORS.
    // api/*: todas las rutas definidas como API.
    // sanctum/csrf-cookie: endpoint usado por Sanctum cuando se use con auth por cookies.
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Metodos HTTP permitidos desde otros origenes.
    // ['*'] permite GET, POST, PUT, PATCH, DELETE, OPTIONS, etc.
    'allowed_methods' => ['*'],

    // Origenes permitidos para consumir la API desde el navegador.
    // FRONTEND_URL permite cambiar el origen por .env sin tocar codigo.
    // Tambien permitimos 127.0.0.1 por si Vite se levanta con esa URL en vez de localhost.
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
        'http://127.0.0.1:5173',
    ],

    // Patrones regex de origen. Vacio porque usamos una lista explicita en allowed_origins.
    'allowed_origins_patterns' => [],

    // Headers permitidos en requests cross-origin.
    // ['*'] simplifica desarrollo (Content-Type, Authorization, X-Requested-With, etc).
    'allowed_headers' => ['*'],

    // Headers que el navegador podra leer explicitamente desde la respuesta.
    // Vacio porque no necesitamos exponer headers custom por ahora.
    'exposed_headers' => [],

    // Cache del preflight (en segundos).
    // 0 = el navegador no cachea la respuesta OPTIONS.
    'max_age' => 0,

    // Si es true, permite cookies/sesion en requests cross-origin.
    // En este setup inicial usamos API simple sin credenciales, por eso false.
    'supports_credentials' => false,
];
