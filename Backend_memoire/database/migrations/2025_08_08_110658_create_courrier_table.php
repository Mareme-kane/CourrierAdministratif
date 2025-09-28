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
        Schema::create('courrier', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->string('objet');
            $table->enum('niveauConfidentiel',['CONFIDENTIEL', 'ORDINAIRE'])->default('ORDINAIRE');
            $table->enum('statutCourrier', ['EN_TRAITEMENT', 'TRAITE', 'ARCHIVE', 'IMPUTE', 'EN_COURS', 'ENVOYE', 'VALIDE', 'NON_VALIDE'])->default('EN_COURS');
            $table->string('fichier_joint')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courrier');
    }
};
