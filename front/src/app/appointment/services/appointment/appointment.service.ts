import {Injectable} from '@angular/core';
import {BaseService} from '../../../core/base.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import DoctorProcedure from '../../models/doctor_procedure.model';
import Appointment from '../../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public findAll(page?: number, limit?: number, filter?: { [key: string]: any }) {
    const url = `${this.baseUrl}/appointments`;
    const httpOptions = Object.assign({}, this.httpOptions);

    if (page || limit) {
      let httpParams = new HttpParams();

      if (page) {
        httpParams = httpParams.set('page', page.toString(10));
      }

      if (limit) {
        httpParams = httpParams.set('limit', limit.toString(10));
      }

      if (filter) {
        Object.keys(filter).forEach((key) => {
          httpParams = httpParams.set(key, filter[key]);
        });
      }

      httpOptions.params = httpParams;
    }

    return this.http.get<Appointment[]>(url, httpOptions);
  }

  public findCount(filterForm?: { [key: string]: any }) {
    const url = `${this.baseUrl}/appointments/count`;
    const httpOptions = Object.assign({}, this.httpOptions);

    if (filterForm) {
      let httpParams = new HttpParams();

      Object.keys(filterForm).forEach((key) => {
        httpParams = httpParams.set(key, filterForm[key]);
      });

      httpOptions.params = httpParams;
    }

    return this.http.get(
      url,
      httpOptions
    );
  }

  public isDoctorAvailable(doctorId: number, appointmentTimestamp: Date) {
    const url = `${this.baseUrl}/appointments/doctor-available`;
    const httpOptions = Object.assign({}, this.httpOptions);

    httpOptions.params = new HttpParams()
      .set('doctor_id', doctorId.toString())
      .set('appointment_timestamp', appointmentTimestamp.toString());

    return this.http.get(
      url,
      httpOptions
    );
  }

  public add(form: FormData) {
    const url = `${this.baseUrl}/appointments`;

    return this.http.post(
      url,
      form
    );
  }
}
