<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;
use \Modules\Doctors\Entities\DoctorsProcedures;

$factory->define(DoctorsProcedures::class, function (Faker $faker) {
    return [
        'doctor_id' => DB::table('doctors')->inRandomOrder()->first()->id,
        'procedure_id' => DB::table('procedures')->inRandomOrder()->first()->id,
    ];
});
