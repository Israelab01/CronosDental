<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->string('prosthesis_type');
            $table->enum('status', ['pending'])->default('pending'); // Puedes ajustar más valores luego
            $table->date('delivery_date');
            $table->json('attachments')->nullable();
            $table->unsignedBigInteger('digital_signature')->nullable();
            $table->string('3d_model_path')->nullable();
            $table->timestamps();

            $table->index('status');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};