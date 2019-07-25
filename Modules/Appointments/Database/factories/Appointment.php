<?php

use Faker\Generator as Faker;
use Modules\Appointments\Entities\Appointment;
use Illuminate\Support\Facades\DB;

$factory->define(Appointment::class, function (Faker $faker) {
    return [
        'doctor_procedure_id' => DB::table('doctors_procedures')->inRandomOrder()->first()->id,
        'appointment_timestamp' => $faker->dateTime,
        'full_name' => $faker->name,
        'phone_number' => $faker->phoneNumber,
        'email' => $faker->email,
    ];
});
