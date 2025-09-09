<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration

{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('missaos', function (Blueprint $table) {
            $table->id(); // Coluna de ID auto-incremental
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nome'); // Coluna para o nome da missão
            $table->text('descricao'); // Coluna para a descrição
            $table->string('status')->default('Pendente'); // Coluna para o status
            $table->timestamps(); // Cria as colunas created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('missaos');
    }
};
