import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider, PatientDetailsProvider, PushNotificationsProvider } from '../../providers/providers';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Home } from "../../pages/pages";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginCred = {};

  timedOut: boolean;
  private loginForm : FormGroup;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public auth: AuthProvider,
    public patient: PatientDetailsProvider,
    public alertCtrl: AlertController,
    public push: PushNotificationsProvider,
    private loading: LoadingController,
    private formBuilder: FormBuilder) {
    if (navParams.get('error')) {
      this.timedOut = true;
    } else {
      this.timedOut = false;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    this.menu.enable(false)
  }

  ionViewDidLeave() {
    this.menu.enable(true)
  }

  submitLogin() {
    let password = this.loginForm.value.password;
    let email = this.loginForm.value.email;

    let loader = this.loading.create({ content: "Logging in..." });
    loader.present();

    this.auth.login(email, password).then((isAuthorised) => {
      if (isAuthorised) {
        this.push.registerNotifications();
        this.navCtrl.setRoot(Home)
        loader.dismiss()
      } else {
        loader.dismiss();
        this.showAlert("Invalid Credentials", "Please try again");
      }
    })
  }

  private showAlert(title, text) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }
}
