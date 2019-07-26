<?php

namespace Modules\Doctors\Entities;

use Illuminate\Database\Eloquent\Model;

class DoctorsProcedures extends Model
{
    protected $fillable = [
        'doctor_id',
        'procedure_id'
    ];

    public $timestamps = false;

    public function appointments() {
        return $this->hasMany('Modules\Appointments\Entities\Appointment');
    }

    public function doctor() {
        return $this->belongsTo('Modules\Doctors\Entities\Doctor');
    }

    public function procedure() {
        return $this->belongsTo('Modules\Doctors\Entities\Procedure');
    }
}
