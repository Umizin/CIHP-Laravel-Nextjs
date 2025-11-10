<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\EmpresaRegisterController;
use App\Http\Controllers\OngRegisterController;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\InscricaoController;

/**
 * Aqui vão ficar as rotas do acesso da API
 */
// Rota Publica: Post de emissão do Token
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || ! Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'As credenciais fornecidas estão incorretas.'
        ], 401);
    }

    return response()->json([
        'token' => $user->createToken('apiToken')->plainTextToken,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'type' => $user->type,
        ]
    ]);
});


Route::post('/login/empresa', function(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = User::where('email', $request->email)
            ->where('type', 'empresa')
            ->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciais inválidas.'], 401);
        }

        $token = $usuario->createToken('empresa_token')->plainTextToken;

        return response()->json([
            'message' => 'Login realizado com sucesso.',
            'token' => $token,
            'user' => [
            'id' => $usuario->id,
            'name' => $usuario->name,
            'type' => $usuario->type,
        ]
        ]);

});

Route::post('/login/ong', function(Request $request){
       $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = User::where('email', $request->email)
            ->where('type', 'ong')
            ->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciais inválidas.'], 401);
        }

        $token = $usuario->createToken('ong_token')->plainTextToken;

        return response()->json([
            'message' => 'Login realizado com sucesso.',
            'token' => $token,
            'user' => [
            'id' => $usuario->id,
            'name' => $usuario->name,
            'type' => $usuario->type,
        ]
        ]);

});

Route::post('/voluntario/register', [VoluntarioController::class, 'register']);

Route::post('/empresa/register', [EmpresaRegisterController::class, 'register']);
Route::post('/ong/register', [OngRegisterController::class, 'register']);
Route::get('/vagas/{id}', [VagaController::class, 'show']); 

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/vagas', [VagaController::class, 'store']);      // Criar vaga
    Route::put('/vagas/{id}', [VagaController::class, 'update']); // Editar
    Route::delete('/vagas/{id}', [VagaController::class, 'destroy']); // Excluir
    Route::get('/ong/vagas', [VagaController::class, 'listarPorOng']);
    Route::post('/inscricoes', [InscricaoController::class, 'store']);
    Route::get('/inscricoes/minhas', [InscricaoController::class, 'minhasInscricoes']);
    Route::delete('/inscricoes/{vaga_id}', [App\Http\Controllers\InscricaoController::class, 'cancelarInscricao']);
});

Route::get('/vagas', [VagaController::class, 'index']); // Listar (pública)

