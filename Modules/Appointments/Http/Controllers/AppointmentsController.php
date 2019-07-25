<?php

namespace Modules\Appointments\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Appointments\Entities\Appointment;
use Modules\Doctors\Entities\Doctor;
use Modules\Doctors\Entities\DoctorsProcedures;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return Appointment::with('doctor', 'procedure')->get();
    }

    /**
     * Check if doctor is available at specific datetime
     * @param Request $request
     * @return Response
     */
    public function checkDoctorsAvailability(Request $request) {
        $doctor = $request->get('doctor');
        $timestamp = $request->get('timestamp');

        $doctors_procedures = DoctorsProcedures::all()->where('doctor_id', $doctor);

        return true;
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('appointments::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
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
