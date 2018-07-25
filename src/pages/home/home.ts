import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { LoginPage, QuestionnairePage, EventsPage } from '../pages';
import { AuthProvider, PatientDetailsProvider, QuestionnaireApiProvider } from "../../providers/providers";

import { Deploy } from '@ionic/cloud-angular';


/**
 * Generated class for the MyTeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  name: string;
  userId;
  labtests: any = [];
  labtestBool: boolean = null;

  questionnaireDone: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public patient: PatientDetailsProvider,
    public menu: MenuController,
    public deploy: Deploy,
    private questionnaireApi: QuestionnaireApiProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getPatientName();
    this.getLabTests();
  }

  getPatientName() {
    this.patient.getPatientDetails().subscribe(results => {
      this.name = results.name;
      this.userId = results.id
      this.checkQuestionnaireDone();
    }, error => {
      this.navCtrl.setRoot(LoginPage, { error: 'expired token' });
    });
  }

  getLabTests() {
    this.patient.getLabTests().subscribe(results => {
      if (results.length != 0) {
        let dates = results[0].dates;
        let readableDates = [];
        this.labtestBool = true;
        dates.forEach(function (date) {
          let dateObject = new Date(Date.parse(date));
          readableDates.push(dateObject.toDateString());
        });
        this.labtests = readableDates;
      } else {
        this.labtestBool = false;
        this.labtests.push("No up coming lab tests");
      }
    })
  }
  checkQuestionnaireDone() {
    this.questionnaireApi.setQuestionnaireDone(this.userId, (result) => { this.questionnaireDone = result });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToQuestionnaire() {
    this.navCtrl.push(QuestionnairePage, { name: this.name, userId: this.userId });
  }

  goToEvents() {
    this.navCtrl.push(EventsPage);
  }
}
