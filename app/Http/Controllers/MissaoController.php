<?php

namespace App\Http\Controllers;

use App\Models\Missao;
use Illuminate\Http\Request;

class MissaoController extends Controller
{
    /**
     * Exibe Relat�rio da Miss�o;
     */
    public function index(){
        $missoes = Missao::all();// Pega tudo que esta salvo
        return view('missao', ['missaos' => $missoes]);
    }
}
