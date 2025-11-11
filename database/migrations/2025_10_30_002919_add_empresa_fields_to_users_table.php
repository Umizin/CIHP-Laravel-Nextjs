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
            Schema::table('users', function (Blueprint $table) {
                $table->string('company_name')->nullable();
                $table->string('cnpj')->nullable();
                $table->string('address')->nullable();
                $table->string('city')->nullable();
                $table->string('state')->nullable();
                $table->string('type')->default(null); // empresa, ong, voluntario
                $table->string('setor')->nullable();
            });
        }


};
