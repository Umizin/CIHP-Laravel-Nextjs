<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class VagaController extends Controller
{
    // ✅ Exibir vaga específica
    public function show($id)
    {
        $vaga = Vaga::with('ong')->find($id);

        if (!$vaga) {
            return response()->json(['error' => 'Vaga não encontrada.'], 404);
        }

        return response()->json($vaga);
    }

    // ✅ Criar nova vaga (ONG autenticada)
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'descricao_detalhada' => 'nullable|string',
            'imagem' => 'nullable|image|max:5120', // até 5MB
            'duracao' => 'nullable|string|max:100',
            'cidade' => 'required|string|max:255',
            'bairro' => 'required|string|max:255',
            'vagas_disponiveis' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        if ($user->type !== 'ong') {
            return response()->json(['error' => 'Apenas ONGs podem publicar vagas.'], 403);
        }

        $imagemPath = null;
        if ($request->hasFile('imagem')) {
            $imagemPath = $request->file('imagem')->store('vagas', 'public');
        }

        $vaga = Vaga::create([
            'ong_id' => $user->id,
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'descricao_detalhada' => $request->descricao_detalhada,
            'imagem' => $imagemPath, // salva o path relativo no banco
            'duracao' => $request->duracao,
            'cidade' => $request->cidade,
            'bairro' => $request->bairro,
            'vagas_disponiveis' => $request->vagas_disponiveis,
        ]);

        // Não modificamos $vaga->imagem; o frontend monta a URL completa
        return response()->json(['message' => 'Vaga criada com sucesso!', 'vaga' => $vaga], 201);
    }

    // ✅ Listar vagas com filtros, pesquisa e paginação
    public function index(Request $request)
    {
        $query = Vaga::query();

        if ($request->filled('search')) {
            $query->where('titulo', 'like', "%{$request->search}%")
                  ->orWhere('descricao', 'like', "%{$request->search}%");
        }

        if ($request->filled('cidade')) {
            $query->where('cidade', $request->cidade);
        }

        if ($request->filled('bairro')) {
            $query->where('bairro', $request->bairro);
        }

        $vagas = $query->with('ong')->orderBy('data_publicacao', 'desc')->paginate(10);

        return response()->json($vagas);
    }

    // ✅ Atualizar vaga
    public function update(Request $request, $id)
    {
        $vaga = Vaga::findOrFail($id);

        if (Auth::id() !== $vaga->ong_id) {
            return response()->json(['error' => 'Você não tem permissão para editar esta vaga.'], 403);
        }

        // Se for atualizar imagem, só salvamos o path relativo
        if ($request->hasFile('imagem')) {
            $requestData = $request->all();
            $requestData['imagem'] = $request->file('imagem')->store('vagas', 'public');
            $vaga->update($requestData);
        } else {
            $vaga->update($request->only([
                'titulo', 'descricao', 'descricao_detalhada',
                'duracao', 'cidade', 'bairro', 'vagas_disponiveis', 'status'
            ]));
        }

        return response()->json(['message' => 'Vaga atualizada com sucesso!', 'vaga' => $vaga]);
    }

    // ✅ Excluir vaga
   public function destroy(Request $request, $id)
    {
        $vaga = Vaga::findOrFail($id);
        $user = Auth::user();

        if ($user->id !== $vaga->ong_id) {
            return response()->json(['error' => 'Você não tem permissão para excluir esta vaga.'], 403);
        }

        // Verifica senha
        if (!\Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Senha incorreta.'], 401);
        }

        $vaga->delete();

        return response()->json(['message' => 'Vaga excluída com sucesso.']);
    }

    public function listarPorOng(Request $request)
{
    $user = $request->user();

    // Verifica se o usuário é realmente uma ONG
    if ($user->type !== 'ong') {
        return response()->json(['error' => 'Acesso negado. Apenas ONGs podem listar suas vagas.'], 403);
    }

    // Busca todas as vagas publicadas por essa ONG
    $vagas = \App\Models\Vaga::where('ong_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($vagas);
}


}
