<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => '\Modules\Doctors\Http\Controllers'], function () {
    Route::get('/doctors', 'DoctorsController@index');
    Route::get('/procedures', 'ProcedureController@index');
});

Route::group(['namespace' => '\Modules\Appointments\Http\Controllers'], function () {
    Route::get('/appointments', 'AppointmentsController@index');
    Route::get('/appointments/count', 'AppointmentsController@count');
    Route::get('/appointments/doctor-available', 'AppointmentsController@checkDoctorsAvailability');
    Route::post('/appointments', 'AppointmentsController@store');
});