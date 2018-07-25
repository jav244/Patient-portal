import { Injectable } from '@angular/core';
import { RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { CustomHttpProvider } from "../custom-http/custom-http";


/*
  Generated class for the PatientDetailsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PatientDetailsProvider {

  private baseUrl = 'https://crohns-portal-api-dev.azurewebsites.net';
  private _token;
  private _patientName: any;

  constructor(public http: CustomHttpProvider) {
    console.log('Hello PatientDetailsProvider Provider');
  }

  get patientName() {
    return this._patientName;
  }

  private updateToken() {
    this._token = localStorage.getItem("token");
  }

  getPatientDetails(): Observable<any> {
    this.updateToken();

    let headers = new Headers({ 'Authorization': 'bearer ' + this._token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.baseUrl}/profile`, options)
      .map((res: Response) => {
        return res.json();
        //return res.json().name;     
      }).catch(error => {
        if (error.status === 401) {
          return Observable.throw("Unauthorized")
        }
      }
      )
  }

  getLabTests(): Observable<any> {
    this.updateToken();

    let headers = new Headers({ 'Authorization': 'bearer ' + this._token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.baseUrl}/labtests`, options)
      .map((res: Response) => {
        return res.json();
        //return res.json().name;     
      }).catch(error => {
        if (error.status === 401) {
          return Observable.throw("Unauthorized")
        }
      }
      )
  }
}
