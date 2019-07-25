<?php

namespace Modules\Doctors\Entities;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function procedures() {
        return $this->belongsToMany('Modules\Doctors\Entities\Procedure', 'doctors_procedures');    }
}
