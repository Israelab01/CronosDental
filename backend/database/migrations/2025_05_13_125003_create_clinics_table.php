<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->comment('Nombre de la clínica');
            $table->string('email')->unique()->comment('Email de contacto');
            $table->string('telefono', 20)->comment('Teléfono de contacto');
            $table->string('direccion')->comment('Dirección física');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clinics');
    }
};
