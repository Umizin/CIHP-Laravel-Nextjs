<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MissaoController extends Controller
{
    /**
     * Exibe Relat�rio da Miss�o;
     */
    public function index(){
        return view('missao');
    }
}
