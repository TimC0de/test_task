<?php

namespace Modules\Doctors\Entities;

use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function doctors() {
        return $this->belongsToMany('Modules\Doctors\Entities\Doctor', 'doctors_procedures');
    }
}
