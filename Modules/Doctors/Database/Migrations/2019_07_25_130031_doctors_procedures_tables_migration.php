<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DoctorsProceduresTablesMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors', function (Blueprint $table){
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('procedures', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('doctors_procedures', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('doctor_id');
            $table->unsignedInteger('procedure_id');

            $table->foreign('doctor_id')->references('id')->on('doctors')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('procedure_id')->references('id')->on('procedures')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doctors_procedures');
        Schema::dropIfExists('procedures');
        Schema::dropIfExists('doctors');
    }
}
