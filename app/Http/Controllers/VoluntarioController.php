<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class VoluntarioController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'confirmed', Password::defaults()],
            'telefone' => 'nullable|string|max:20',
            'cpf' => 'nullable|string|unique:users,cpf',
            'data_nascimento' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
        ]);

        $user = User::create([
    'name' => $validated['name'],
    'email' => $validated['email'],
    'type' => 'voluntario',
    'password' => Hash::make($validated['password']), // hash correto
    'telefone' => $validated['telefone'] ?? null,
    'cpf' => $validated['cpf'] ?? null,
    'data_nascimento' => $validated['data_nascimento'] ?? null,
    'address' => $validated['address'] ?? null,
    'cidade' => $validated['cidade'] ?? null,
    'estado' => $validated['estado'] ?? null,
]);


        return response()->json([
            'message' => 'Cadastro realizado com sucesso',
        ], 201);
    }
}
