<?php

use Faker\Generator as Faker;
use Modules\Doctors\Entities\Doctor;

$factory->define(Doctor::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
