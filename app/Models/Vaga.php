<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    use HasFactory;

    protected $fillable = [
        'ong_id',
        'titulo',
        'descricao',
        'descricao_detalhada',
        'imagem',
        'duracao',
        'cidade',
        'bairro',
        'vagas_disponiveis',
        'status',
        'data_publicacao'
    ];

    public function ong() {
        return $this->belongsTo(User::class, 'ong_id');
    }
}

