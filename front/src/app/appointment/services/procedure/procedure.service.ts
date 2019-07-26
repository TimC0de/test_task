import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../../core/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService extends BaseService {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public findAll() {
    const url = `${this.baseUrl}/procedures`;

    return this.http.get(
      url,
      this.httpOptions
    );
  }
}
