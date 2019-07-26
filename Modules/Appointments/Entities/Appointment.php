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
        'email',
    ];

    public $timestamps = true;

    public function doctor_procedure() {
        return $this->belongsTo('Modules\Doctors\Entities\DoctorsProcedures');
    }
}
