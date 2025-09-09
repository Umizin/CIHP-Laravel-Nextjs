<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/missao', function () {
    return 'Diretiva recebida. Status: Operacional. Ambiente: estável';
});