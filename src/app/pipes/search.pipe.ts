import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(peopleRecords: any[], searchString: string): any {
    if (peopleRecords.length === 0) {
      return [];
    }
    else if (searchString === '') {
      return peopleRecords;
    }
    else {
      return peopleRecords.filter(item => ['name', 'contactNumber'].some(data => (item[data] === null || item[data] === undefined) ? '' : item[data].toString().toLowerCase().includes(searchString.toLowerCase())));
    }
  }

}
