<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscricao extends Model
{
    use HasFactory;

    protected $table = 'inscricaos';

    protected $fillable = [
        'vaga_id',
        'voluntario_id',
        'status',
        'data_inscricao',
        'data_cancelamento'
    ];

    public $timestamps = false;

    public function vaga()
    {
        return $this->belongsTo(Vaga::class);
    }

    public function voluntario()
    {
        return $this->belongsTo(Voluntario::class);
    }
}
