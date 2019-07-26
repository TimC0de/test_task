<?php

namespace Modules\Appointments\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Appointments\Entities\Appointment;

class AppointmentsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('appointments')->delete();
        factory(Appointment::class, 50)->create();
    }
}
