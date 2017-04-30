import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Config } from '../enum/config.enum';

@Injectable()
export class ProductService {

  constructor(private http: Http) {}

  list() : Promise<any>{
    let url = Config[0] + '/product';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.get(url, {headers: headers, body: ''})
      .toPromise()
      .then(retorno => retorno.json())
      .catch(error => error);
  }
}
