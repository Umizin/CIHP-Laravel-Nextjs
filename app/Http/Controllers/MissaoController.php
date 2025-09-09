<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MissaoController extends Controller
{
    /**
     * Exibe Relatório da Missão;
     */
    public function index(){
        return view('missao');
    }
}
