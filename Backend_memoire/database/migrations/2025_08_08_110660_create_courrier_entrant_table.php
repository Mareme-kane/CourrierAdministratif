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
        Schema::create('courrier_entrant', function (Blueprint $table) {
            $table->id();
            $table->foreignId('courrier_id')->constrained('courrier')->onDelete('cascade');
            $table->string('expediteur');
            $table->dateTime('dateArrivee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courrier_entrant');
    }
};
