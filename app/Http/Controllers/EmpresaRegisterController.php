<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EmpresaRegisterController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'responsavel' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'setor' => 'nullable|string',
            'cnpj'=> 'required|string|max:18',
            'cidade' => 'required|string',
            'estado' => 'required|string'
        ]);

        $user = User::create([
            'name' => $validated['company_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'type' => 'empresa',
            'responsavel' => $validated['responsavel'],
            'telefone' => $validated['telefone'],
            'setor' => $validated['setor'] ?? null,
            'cnpj' => $validated['cnpj'],
            'cidade' => $validated['cidade'],
            'estado' => $validated['estado']
        ]);

        return response()->json(['message' => 'Empresa cadastrada com sucesso!'], 201);
    }
}
