import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { Push } from "@ionic-native/push";
import {XHRBackend, RequestOptions} from '@angular/http';

import { MyApp } from './app.component';
import { Home, LoginPage, EventsPage, EnquiryPage, QuestionnairePage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PushNotificationsProvider } from '../providers/providers';
import { AuthProvider } from '../providers/auth/auth';
import { PatientDetailsProvider } from '../providers/patient-details/patient-details';
import { CustomHttpProvider } from '../providers/custom-http/custom-http';
import { CustomCardComponent } from "../components/custom-card/custom-card";
import { QuestionnaireApiProvider } from '../providers/questionnaire-api/questionnaire-api';
import {DatePipe} from '../pipes/date/date'

const cloudSettings:CloudSettings = {
  'core':{
    'app_id': '98965113'
  }
};

@NgModule({
  declarations: [
    MyApp,
    Home,
    LoginPage,
    EventsPage,
    EnquiryPage, 
    QuestionnairePage,
    CustomCardComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    LoginPage,
    EventsPage,
    EnquiryPage, 
    QuestionnairePage, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push,
    PushNotificationsProvider,
    AuthProvider,
    PatientDetailsProvider,
    PatientDetailsProvider,
    {
      provide: CustomHttpProvider,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new CustomHttpProvider(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    QuestionnaireApiProvider,
    DatePipe
  ]
})
export class AppModule {}
