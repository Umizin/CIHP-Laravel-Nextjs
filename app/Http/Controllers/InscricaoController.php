<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inscricao;
use App\Models\Vaga;
use Illuminate\Support\Facades\Auth;

class InscricaoController extends Controller
{
    // 🔹 Inscrever voluntário em uma vaga
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->type !== 'voluntario') {
            return response()->json(['error' => 'Apenas voluntários podem se inscrever.'], 403);
        }

        $request->validate([
            'vaga_id' => 'required|exists:vagas,id',
        ]);

        $vaga = Vaga::findOrFail($request->vaga_id);

        // Verifica se ainda há vagas disponíveis
        if ($vaga->vagas_disponiveis <= 0) {
            return response()->json(['error' => 'Não há vagas disponíveis.'], 400);
        }

        // Verifica se já está inscrito (sem cancelamento)
        $jaInscrito = Inscricao::where('vaga_id', $vaga->id)
            ->where('voluntario_id', $user->id)
            ->whereNull('data_cancelamento')
            ->exists();

        if ($jaInscrito) {
            return response()->json(['error' => 'Você já está inscrito nesta vaga.'], 400);
        }

        // Cria a inscrição
        $inscricao = Inscricao::create([
            'vaga_id' => $vaga->id,
            'voluntario_id' => $user->id,
            'status' => 'pendente',
            'data_inscricao' => now(),
        ]);

        // Subtrai uma vaga
        $vaga->decrement('vagas_disponiveis', 1);

        return response()->json([
            'message' => 'Inscrição realizada com sucesso!',
            'inscricao' => $inscricao,
            'vagas_restantes' => $vaga->vagas_disponiveis,
        ], 201);
    }

    // 🔹 Cancelar inscrição (DELETE /api/inscricoes/{vaga_id})
    public function cancelarInscricao(Request $request, $vaga_id)
    {
        $user = $request->user();

        if ($user->type !== 'voluntario') {
            return response()->json(['error' => 'Apenas voluntários podem cancelar inscrições.'], 403);
        }

        $inscricao = Inscricao::where('vaga_id', $vaga_id)
            ->where('voluntario_id', $user->id)
            ->whereNull('data_cancelamento')
            ->first();

        if (!$inscricao) {
            return response()->json(['error' => 'Inscrição não encontrada ou já cancelada.'], 404);
        }

        // Atualiza o cancelamento
        $inscricao->update([
            'data_cancelamento' => now(),
            'status' => 'cancelada',
        ]);

        // Retorna uma vaga
        $vaga = Vaga::find($vaga_id);
        if ($vaga) {
            $vaga->increment('vagas_disponiveis', 1);
        }

        return response()->json([
            'message' => 'Inscrição cancelada com sucesso!',
            'vaga_atualizada' => $vaga ? $vaga->vagas_disponiveis : null,
        ]);
    }

    // 🔹 Listar inscrições do voluntário logado
    public function minhasInscricoes(Request $request)
    {
        $user = $request->user();

        if ($user->type !== 'voluntario') {
            return response()->json(['error' => 'Apenas voluntários podem ver suas inscrições.'], 403);
        }

        $inscricoes = Inscricao::with('vaga')
            ->where('voluntario_id', $user->id)
            ->whereNull('data_cancelamento')
            ->orderBy('data_inscricao', 'desc')
            ->paginate(5);

        return response()->json($inscricoes);
    }
}
