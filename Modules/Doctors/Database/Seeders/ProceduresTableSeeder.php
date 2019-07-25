<?php

namespace Modules\Doctors\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Doctors\Entities\Procedure;

class ProceduresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('procedures')->delete();
        $procedures_list = [
            'Bridges and Implants',
            'Root Canals',
            'Veneers',
            'Teeth Whitening',
            'Extractions'
        ];

        array_map(function ($procedure) {
            Procedure::create([ 'name' => $procedure ]);
        }, $procedures_list);
    }
}
