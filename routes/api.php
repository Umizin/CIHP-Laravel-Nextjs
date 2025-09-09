<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Aqui vão ficar as rotas do acesso da API
 */
// Rota Publica: Post de emissão do Token
Route::post('/login', function (Request $request){
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || ! Hash::check($request->password, $user->password)){
        throw ValidationException::withMessages([
            'email' => ['As credenciais fornecidas estão incorretas.'],
        ]);
    }

    return $user->createToken('apiToken')->plainTextToken;
});

// Rota privada: Caso entre o laravel já sabe qual o usuário
Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});

