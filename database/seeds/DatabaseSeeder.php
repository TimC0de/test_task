<?php

use Illuminate\Database\Seeder;
use Modules\Doctors\Database\Seeders\DoctorsDatabaseSeeder;
use Modules\Appointments\Database\Seeders\AppointmentsDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DoctorsDatabaseSeeder::class);
        $this->call(AppointmentsDatabaseSeeder::class);
    }
}
