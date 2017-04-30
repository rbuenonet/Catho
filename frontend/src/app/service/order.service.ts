import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Config } from '../enum/config.enum';

@Injectable()
export class OrderService {

  constructor(private http: Http) {}

  insert(param) : Promise<any>{
    let url = Config[0] + '/order';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.post(url, param, {headers: headers})
      .toPromise()
      .then(retorno => retorno.json())
      .catch(error => error);
  }

}
