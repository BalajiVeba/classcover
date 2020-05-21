import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  readConfigurationsData() {
    return this.http.get('assets/json/configurations.json').pipe(map(
      data => {
        return data;
      }
    ));
  }

}
