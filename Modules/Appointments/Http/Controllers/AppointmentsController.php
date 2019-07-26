<?php

namespace Modules\Appointments\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Appointments\Entities\Appointment;
use Modules\Doctors\Entities\Doctor;
use Modules\Doctors\Entities\DoctorsProcedures;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $query = Appointment::with(
            'doctor_procedure',
            'doctor_procedure.doctor',
            'doctor_procedure.procedure'
        );

        foreach($request->all() as $param => $value) {
            if ($param !== 'limit' && $param !== 'page')
            {
                if ($param === 'sort')
                {
                    $query = $query->orderBy(
                        'created_at',
                        $value === 'newest'
                            ? 'desc'
                            : 'asc'
                    );
                }
                else if ($param !== 'min_appointment_timestamp' && $param !== 'max_appointment_timestamp')
                {
                    $query = $query->where($param, 'like', "%$value%");
                }
            }
        };

        if ($request->get('min_appointment_timestamp'))
        {
            $query = $query->whereBetween(
                'appointment_timestamp',
                [
                    $request->get('min_appointment_timestamp'),
                    $request->get('max_appointment_timestamp')
                        ? $request->get('max_appointment_timestamp')
                        : date('Y-m-d H:i:s')
                ]
            );
        }

        if ($request->get('limit') && $request->get('page')) {
            $query = $query
                ->limit($request->get('limit'))
                ->offset(($request->get('page') - 1) * $request->get('limit'));
        }

        return $query->get();
    }

    /**
     * Find appointments count
     * @param Request $request
     * @return Response
     */
    public function count(Request $request) {
        $query = Appointment::all();

        foreach($request->all() as $param => $value) {
            if ($param !== 'limit' && $param !== 'page')
            {
                if ($param !== 'sort' && $param !== 'min_appointment_timestamp' && $param !== 'max_appointment_timestamp')
                {
                    $query = $query->where($param, 'like', "%$value%");
                }
            }
        };

        if ($request->get('min_appointment_timestamp'))
        {
            $query = $query->whereBetween(
                'appointment_timestamp',
                [
                    $request->get('min_appointment_timestamp'),
                    $request->get('max_appointment_timestamp')
                        ? $request->get('max_appointment_timestamp')
                        : date('Y-m-d H:i:s')
                ]
            );
        }

        return [
            'count' => $query->count()
        ];
    }

    /**
     * Check if doctor is available at specific datetime
     * @param Request $request
     * @return Response
     */
    public function checkDoctorsAvailability(Request $request) {
        $doctor_id = $request->get('doctor_id');
        $appointment_timestamp = $request->get('appointment_timestamp');

        $doctors_procedures_id = DB::table('doctors_procedures')
            ->select('id')
            ->where('doctor_id', $doctor_id)
            ->get();

        $doctors_procedures_id = $doctors_procedures_id->map(function ($object) {
            return $object->id;
        });

        $appointment = DB::table('appointments')
            ->whereIn('doctor_procedure_id', $doctors_procedures_id)
            ->where('appointment_timestamp', '=', $appointment_timestamp)
            ->first();

        return [ 'available' => $appointment === NULL ];
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $formData = $request->all();

        $doctorProcedure = DoctorsProcedures::all()
            ->where('doctor_id', $formData['doctor_id'])
            ->where('procedure_id', $formData['procedure_id'])
            ->first();

        $formData['doctor_procedure_id'] = $doctorProcedure->id;

        $appointment = Appointment::create($formData);

        return $appointment;
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        return view('appointments::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        return view('appointments::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
