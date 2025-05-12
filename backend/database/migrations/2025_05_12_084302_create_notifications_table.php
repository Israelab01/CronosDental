<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->text('message');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });


    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};