import { Component, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  availableOptions: any[] = [];
  dateOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd-mm-yyyy',
    satHighlight: true
  };
  dateRange: IMyDateModel = null;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.fetchAvailableOptions();
    this.setDateRange();
  }

  setDateRange() {
    let begin: Date = new Date();
    let end: Date = new Date();
    end.setDate(end.getDate() + 30);
    this.dateRange = {
      isRange: true,
      singleDate: null,
      dateRange: {
        beginDate: {
          year: begin.getFullYear(), month: begin.getMonth() + 1, day: begin.getDate()
        },
        endDate: {
          year: end.getFullYear(), month: end.getMonth() + 1, day: end.getDate()
        }
      }
    };
  }

  fetchAvailableOptions() {
    this.appService.readConfigurationsData().subscribe(data => {
      this.availableOptions = data['availableOptions'];
    })
  }

  returnClasses(availability) {
    let classes = 'fa fa-circle pr-1 text-';
    if (availability.label === 'Haven\'t Indicated') {
      classes = availability.className + ' pr-1';
    }
    else {
      classes = classes + availability.className;
    }
    return classes;
  }

}
