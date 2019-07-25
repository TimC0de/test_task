<?php

namespace Modules\Appointments\Entities;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'doctor_procedure_id',
        'appointment_timestamp',
        'full_name',
        'phone_number',
        'email'
    ];

    public $timestamps = false;

    public function doctorProcedure() {
        return $this->belongsTo('Modules\Doctors\Entities\DoctorsProcedures');
    }
}
