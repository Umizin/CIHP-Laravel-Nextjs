<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('telefone')->nullable()->after('password');
            $table->date('data_nascimento')->nullable()->after('telefone');
            $table->string('cidade')->nullable()->after('data_nascimento');
            $table->string('estado')->nullable()->after('cidade');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['telefone', 'data_nascimento', 'cidade', 'estado']);
        });
    }
};
