import Doctor from './doctor.model';

export default class Procedure {
  public id?: number;
  public name?: string;

  public doctors?: Doctor[];

  public constructor(model: { [key: string]: any }) {
    this.id = model.id;
    this.name = model.name;
  }
}
