import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpProvider extends Http {
  constructor(backend: XHRBackend, options: RequestOptions, ) {
    super(backend, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, options).catch(this.catchAuthError(this));
  }


  post(url: string, data, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, data, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: CustomHttpProvider) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        return Observable.throw(res);
      }
    };
  }
}

