import Procedure from './procedure.model';

export default class Doctor {
  public id?: number;
  public name?: string;

  public procedures?: Procedure[];

  public constructor(model: { [key: string]: any }) {
    this.id = model.id;
    this.name = model.name;
  }
}
