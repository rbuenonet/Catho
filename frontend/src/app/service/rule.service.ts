import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Config } from '../enum/config.enum';

@Injectable()
export class RuleService {

  constructor(private http: Http) { }

  insertRules(param) : Promise<any>{
    let url = Config[0] + '/rule';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.post(url, param, {headers: headers})
      .toPromise()
      .then(retorno => retorno.json())
      .catch(error => error);
  }

  updateRules(param) : Promise<any>{
    let url = Config[0] + '/rule';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.put(url, param, {headers: headers})
      .toPromise()
      .then(retorno => retorno.json())
      .catch(error => error);
  }

}
