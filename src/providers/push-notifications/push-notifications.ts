import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { PatientDetailsProvider } from "../patient-details/patient-details";
import { QuestionnairePage } from "../../pages/pages";

declare var WindowsAzure: any;


@Injectable()
export class PushNotificationsProvider {
  pushObject: PushObject;
  client: any;


  constructor(private push: Push,
    private platform: Platform,
    private patient: PatientDetailsProvider
  ) {
    if (WindowsAzure) {
      this.client = new WindowsAzure.MobileServiceClient("https://stratospatientportal.azurewebsites.net");
    } else {
      console.log("windows azure not defined")
    }
  }

  unregisterNotifications() {
    this.pushObject.unregister();
  }

  registerNotifications() {
    this.registerTags();
  }

  private pushsetup(tags) {
    const options: PushOptions = {
      android: {
        senderID: '862370953640',
        icon: 'test1',
        iconColor: 'BLUE'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    this.pushObject = this.push.init(options);

    this.pushObject.on('registration').subscribe((data: any) => {
      let platform = this.platform;
      let handle = data.registrationId;
      if (platform.is('android') || platform.is('Android')) {
        this.client.push.register('gcm', handle, {
          mytemplate: {
            body: { data: { message: "{$(message)}" } },
            tags: tags
          }
        })
        //handle ios notification registration
        // } else if (this.platform.is('ios')) {
        //   this.client.push.register('apns', handle, {
        //     mytemplate: { body: { aps: { alert: "{$(message)}" } } },
        //     tags: tags
        //   }, );
      }
    });

    this.pushObject.on('notification').subscribe((data: any) => {
      if (!data.additionalData.foreground) {
        //have logic here that takes the user to the appropriate page,
        //as in take the user to questionnaore page if they get a notification regarding the questionnaire
        console.log('Push notification clicked');
      }
    });

    this.pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  registerTags() {
    let tags: any = [];

    this.patient.getPatientDetails().subscribe(data => {
      tags.push("PatientName:" + data.name);
      tags.push("PatientId:" + data.id);
      this.pushsetup(tags);
    }, (err) => {
      return err;
    });
  }

}
