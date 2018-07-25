import { Pipe, PipeTransform } from '@angular/core';

import * as moment from "moment-timezone"


/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {

  transform(value, ...args) {

    var values = String(moment(value).tz("Pacific/Auckland").format());
    var split = values.split("T")[0].split("-");

    var day = split[2];
    var month = split[1];
    var year = split[0];

    return day + "/" + month + "/" + year;
  }


}
