import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientDetailsProvider, QuestionnaireApiProvider } from '../../providers/providers';
import { LoginPage, Home } from "../pages";
import { DatePipe } from "../../pipes/date/date";

declare var WindowsAzure: any;


/**
 * Generated class for the QuestionnairePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-questionnaire',
  templateUrl: 'questionnaire.html',
})
export class QuestionnairePage {
  name: string;
  userId: string;
  questionnaireDone: boolean = null;

  rating: string = '';
  explanation: string = "";

  client: any;

  smileys = {
    good: "assets/img/happyface.png",
    medium: "assets/img/mediumface.png",
    bad: "assets/img/sadface.png"
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private patient: PatientDetailsProvider,
    private questionnaireApi: QuestionnaireApiProvider
  ) {
    // this.client = new WindowsAzure.MobileServiceClient("https://stratospatientportal.azurewebsites.net");
    // let tableName = "Questionnaire";
    // this.table = this.client.getTable(tableName);
    this.name = navParams.get('name');
    this.userId = navParams.get('userId')
  }

  submit() {
    let datePipe = new DatePipe();

    let explanation;

    if (this.explanation == "") {
      explanation = "none given";
    } else {
      explanation = this.explanation;
    }

    var local = datePipe.transform(new Date());

    let questionnaireData = {
      userId: this.userId,
      rating: this.rating,
      explanation: explanation,
      localDate: local
    };

    this.questionnaireApi.insertData(questionnaireData);

  }
  checkQuestionnaireDone() {
    this.questionnaireApi.setQuestionnaireDone(this.userId, (result) => { this.questionnaireDone = result });
  }

  private chooseRating(rating) {
    this.rating = rating;
  }

  ionViewDidLoad() {
    this.setPatientDetails();
  }

  setPatientDetails() {
    this.patient.getPatientDetails().subscribe(user => {
      this.name = user.name;
      this.userId = user.id;
      this.checkQuestionnaireDone();
      // this.userName = user.userName;
    }, (err) =>
        this.navCtrl.setRoot(LoginPage, { error: 'expired token' }));
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thanks!',
      subTitle: 'Are you sure you want to submit this?',

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log(data);
            this.submit();
            this.navCtrl.setRoot(Home);
          }
        }
      ]
    });
    alert.present();
  }
}
