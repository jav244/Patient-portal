import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientDetailsProvider } from "../../providers/providers";

/**
 * Generated class for the EnquiryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquiry',
  templateUrl: 'enquiry.html',
})
export class EnquiryPage {
  User: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private patient: PatientDetailsProvider) {
  }
}
