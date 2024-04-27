import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Period {
  temperature: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(location: string): Observable<any> {
    return this.http.get(`https://api.weather.gov/gridpoints/${location}/forecast`);
  }

  extractTemperatures(response: any): { name: string, temperature: number }[] {
    const temperatureData: { name: string, temperature: number }[] = response.properties.periods
      .slice(0, 7)
      .map((period: Period) => ({ name: period.name, temperature: period.temperature }));
    return temperatureData;
  }
}