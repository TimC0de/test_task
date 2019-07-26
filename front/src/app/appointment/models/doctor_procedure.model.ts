import Procedure from './procedure.model';
import Doctor from './doctor.model';

export default class DoctorProcedure {
  public id?: number;
  public doctor_id?: number;
  public procedure_id?: number;

  public doctor?: Doctor;
  public procedure?: Procedure;
}
