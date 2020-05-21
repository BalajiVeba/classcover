import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

import { AppService } from './../services/app.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('nameHeaderTemplate', { static: true }) nameHeaderTemplate: TemplateRef<any>;
  @ViewChild('dateHeaderTemplate', { static: true }) dateHeaderTemplate: TemplateRef<any>;
  @ViewChild('nameRowTemplate', { static: true }) nameRowTemplate: TemplateRef<any>;
  @ViewChild('dateRowTemplate', { static: true }) dateRowTemplate: TemplateRef<any>;

  @Input() dateRange: any;
  searchText: string = '';
  calendarRows: any[] = [];
  calendarColumns: any[] = [];
  availableOptions: any[] = [];
  selectedPeople: any;
  selectedDate: string = '';
  selectedAvailability: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.readConfigurationsData().subscribe(data => {
      this.calendarRows = data['peopleList'];
      this.availableOptions = data['availableOptions'];
    })
  }

  ngOnChanges() {
    this.calendarColumns = [];
    this.calendarColumns.push({ 'prop': 'name', 'name': 'Name', width: 300, headerTemplate: this.nameHeaderTemplate, cellTemplate: this.nameRowTemplate, frozenLeft: true, 'resizeable': false, 'draggable': false, 'sortable': true });
    let
      startDate = new Date(this.dateRange.beginDate.year + '-' + this.dateRange.beginDate.month + '-' + this.dateRange.beginDate.day),
      endDate = new Date(this.dateRange.endDate.year + '-' + this.dateRange.endDate.month + '-' + this.dateRange.endDate.day);
    let availableDates = this.fetchAvailableDates(startDate, endDate);
    availableDates.forEach(date => {
      this.calendarColumns.push({ 'prop': moment(date).format('DD-MM-YYYY'), 'name': moment(date).format('dddd-DD-MMM').split('-'), width: 100, headerTemplate: this.dateHeaderTemplate, cellTemplate: this.dateRowTemplate, 'resizeable': false, 'draggable': false, 'sortable': true });
    })
  }

  fetchAvailableDates(startDate, endDate) {
    let
      arr = new Array(),
      dt = new Date(startDate);
    while (dt <= endDate) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  returnClasses(date, row) {
    let classes = 'fullHeight fullWidth badge-';
    if (row.availableDates.indexOf(date) > -1) {
      classes = classes + this.availableOptions.find(option => option.label === 'Available').className;
    }
    else if (row.unavailableDates.indexOf(date) > -1) {
      classes = classes + this.availableOptions.find(option => option.label === 'Unavailable').className;
    }
    else {
      classes = this.availableOptions.find(option => option.label === 'Haven\'t Indicated').className + ' fa-2x';
    }
    return classes;
  }

  openAvailalilityModal(date, row) {
    this.selectedPeople = row;
    this.selectedDate = date;
    this.selectedAvailability = { label: this.returnCurrentAvailability(date, row), class: 'dummy' };
    $('#changeAvailabilityModal').modal('show');
  }

  changeAvailability() {
    let index = this.calendarRows.findIndex(people => people.id === this.selectedPeople.id);
    if (this.selectedAvailability.label === 'Available') {
      this.calendarRows[index].availableDates.push(this.selectedDate);
      this.calendarRows[index].unavailableDates = this.calendarRows[index].unavailableDates.filter(date => date != this.selectedDate);
    }
    else if (this.selectedAvailability.label === 'Unavailable') {
      this.calendarRows[index].unavailableDates.push(this.selectedDate);
      this.calendarRows[index].availableDates = this.calendarRows[index].availableDates.filter(date => date != this.selectedDate);
    }
    else {
      this.calendarRows[index].availableDates = this.calendarRows[index].availableDates.filter(date => date != this.selectedDate);
      this.calendarRows[index].unavailableDates = this.calendarRows[index].unavailableDates.filter(date => date != this.selectedDate);
    }
    $('#changeAvailabilityModal').modal('hide');
  }

  returnCurrentAvailability(date, row) {
    if (row.availableDates.indexOf(date) > -1) {
      return 'Available';
    }
    else if (row.unavailableDates.indexOf(date) > -1) {
      return 'Unavailable';
    }
    else {
      return 'Haven\'t Indicated';
    }
  }

}
