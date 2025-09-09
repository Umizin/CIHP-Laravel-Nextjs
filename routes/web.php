<?php
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MissaoController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/missao', [MissaoController::class, 'index']);

Route::get('/teste-relacionamento', function () {
    $user = User::first();
    $missaosDoUser = $user->missaos;

    return $missaosDoUser;
});