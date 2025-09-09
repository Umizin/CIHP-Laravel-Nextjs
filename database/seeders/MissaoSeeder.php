<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Missao;

class MissaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Missao::create([
            'nome' => 'Patrulha na Montanha Natagumo',
            'descricao' => 'Investigar desaparecimentos na montanha. Suspeita de uma Lua Inferior.',
            'status' => 'Concluída'
        ]);

        Missao::create([
            'nome' => 'Defesa do Distrito do Entretenimento',
            'descricao' => 'Lutar ao lado de um Hashira contra uma Lua Superior.',
            'status' => 'Em Andamento'
        ]);
    }
}
