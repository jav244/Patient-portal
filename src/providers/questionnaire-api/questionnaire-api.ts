import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DatePipe } from "../../pipes/date/date";
import * as _ from "lodash"

declare var WindowsAzure: any;

/*
  Generated class for the PatientQuestionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QuestionnaireApiProvider {
  private client: any;
  private table: any;

  constructor() {
    console.log('Hello PatientQuestionProvider Provider');

    this.client = new WindowsAzure.MobileServiceClient("https://stratospatientportal.azurewebsites.net");
    //let tableName = "Questionnaire";
    this.table = this.client.getTable("Questionnaire");
  }

  insertData(data) {
    this.table
      .insert(data)
      .done(this.success, this.failure);
  }

  getUserRecords(userId) {
    this.table
      .where({ userId: userId })
      .read()
      .then((result) => {
        var test = this.checkDate(result);
        return this.checkDate(test)
      });
  }
  setQuestionnaireDone(userId, callback) {
    this.table
      .where({ userId: userId })
      .read()
      .then((result) => {
        var test = this.checkDate(result);
        callback(test);
      });
  }

  private checkDate(data) {
    let datePipe = new DatePipe();
    let match: boolean = false;

    _.forIn(data, function (value, key) {
      let recordDate = datePipe.transform(value.updatedAt);
      let todaysDate = datePipe.transform(new Date());

      if (recordDate == todaysDate) {
        console.log(recordDate + "=====" + key + "=====" + todaysDate);
        match = true;
      }
    });
    return match;
  }

  private success(results) {
    console.log(results);
  }

  private failure(error) {
    console.log(error);
  }

}
