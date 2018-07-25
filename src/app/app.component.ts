import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { PushNotificationsProvider, AuthProvider } from '../providers/providers';

import { Home, EventsPage, EnquiryPage, QuestionnairePage, LoginPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  loader: any;
  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public push: PushNotificationsProvider,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    public loading: LoadingController
  ) {
    this.initializeApp();
    this.setPages();

    platform.ready().then(() => {
      this.hideSplashScreen();
    });
  }
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  setPages() {
    this.pages = [
      { title: 'Home', component: Home, icon: "home" },
      { title: 'Questionnaire', component: QuestionnairePage, icon: "clipboard" },
      { title: 'Appointments', component: EventsPage, icon: "calendar" },
      { title: 'Enquire', component: EnquiryPage, icon: "mail" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let loader = this.loading.create({
        content: "Loading"
      });
      loader.present();

      this.auth.isLoggedIn().subscribe(() => {
        this.push.registerNotifications();
        this.rootPage = Home;
        loader.dismiss();
      }, (err) => {
        this.rootPage = LoginPage;
        loader.dismiss();
      })
    });
  }

  goToPage(page) {
    if (page.component == Home) {
      this.nav.setRoot(Home);
    } else {
      this.nav.push(page.component);
    }
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  stopNotifications() {
    this.push.unregisterNotifications();
  }

  startNotifications() {
    this.push.registerNotifications();
  }

  registerTags() {
    this.push.registerTags();
  }

}
