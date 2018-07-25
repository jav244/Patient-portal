import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PatientDetailsProvider } from "../../providers/providers";
import { LoginPage } from "../pages";



/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  labtests: any = [];
  labtestBool: boolean = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private patient: PatientDetailsProvider,
    private loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.getLabTests();
  }

  getLabTests() {
    let loader = this.loading.create({
      content: "Loading..."
    });

    loader.present();

    this.patient.getLabTests().subscribe(results => {
      if (results != 0) {
        let dates = results[0].dates;
        let readableDates = [];
        this.labtestBool = true;
        dates.forEach(function (date) {
          let dateObject = new Date(Date.parse(date));
          readableDates.push(dateObject.toDateString());
        });
        this.labtests = readableDates;
        loader.dismiss();
      } else {
        this.labtestBool = false;
        this.labtests.push("No up coming lab tests");
        loader.dismiss();
      }
    },
      err => {
        loader.dismiss();
        this.navCtrl.setRoot(LoginPage, { error: 'expired token' });
      }
    )
  }

}
