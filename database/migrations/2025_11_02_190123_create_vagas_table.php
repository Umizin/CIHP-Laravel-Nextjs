<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('vagas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ong_id')->constrained('users')->onDelete('cascade');
            $table->string('titulo');
            $table->text('descricao');
            $table->text('descricao_detalhada')->nullable();
            $table->string('imagem')->nullable();
            $table->string('duracao')->nullable();
            $table->string('cidade')->nullable();
            $table->string('bairro')->nullable();
            $table->integer('vagas_disponiveis')->default(1);
            $table->string('status')->default('ativa');
            $table->timestamp('data_publicacao')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('vagas');
    }
};
