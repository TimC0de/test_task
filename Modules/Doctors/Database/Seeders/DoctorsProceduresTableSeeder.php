<?php

namespace Modules\Doctors\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Doctors\Entities\DoctorsProcedures;

class DoctorsProceduresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('doctors_procedures')->delete();
        factory(DoctorsProcedures::class, 20)->create();
    }
}
