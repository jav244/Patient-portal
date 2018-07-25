import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { PatientDetailsProvider } from "../patient-details/patient-details";
import { PushNotificationsProvider } from "../push-notifications/push-notifications";
import { CustomHttpProvider } from "../custom-http/custom-http";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private baseUrl = 'https://crohns-portal-api-dev.azurewebsites.net';
  // public access_token: any;

  constructor(public http: CustomHttpProvider,
    public patient: PatientDetailsProvider,
    private push: PushNotificationsProvider) {
  }

  isLoggedIn(): Observable<any> {
    return this.patient.getPatientDetails().map((res) => {
      return res
    })
  }


  login(email: String, password: String) {
    return new Promise((res => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = "grant_type=password&username=" + email + "&password=" + password;

      this.http.post(`${this.baseUrl}/token`, body, options)
        .map((res: Response) => res.json())
        .subscribe(
        data => {
          localStorage.setItem('token', data.access_token);
          res(true);
        },
        error => {
          res(false)
        }
        )
    }))
  }

  logout() {
    this.push.unregisterNotifications();
    localStorage.removeItem("token");
  }

}
