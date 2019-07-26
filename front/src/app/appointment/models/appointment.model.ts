import DoctorProcedure from './doctor_procedure.model';

export default class Appointment {
  public id?: number;
  public doctor_procedure_id?: number;
  public appointment_timestamp?: Date;
  public full_name?: string;
  public phone_number?: string;
  public email?: string;
  public created_at?: Date;
  public updated_at?: Date;

  public doctor_procedure?: DoctorProcedure;
}
