import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  temperatureData1: { name: string, temperature: number }[] = [];
  temperatureData2: { name: string, temperature: number }[] = [];
  chart1: any;
  chart2: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getForecast('TOP/31,80').subscribe((response: any) => {
      this.temperatureData1 = this.weatherService.extractTemperatures(response);
      this.renderChart1();
    });

    this.weatherService.getForecast('LWX/31,80').subscribe((response: any) => {
      this.temperatureData2 = this.weatherService.extractTemperatures(response);
      this.renderChart2();
    });
  }

  renderChart1(): void {
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: this.temperatureData1.map(period => period.name),
        datasets: [
          {
            label: 'Kansas Weather',
            data: this.temperatureData1.map(period => period.temperature),
            borderColor: 'rgba(255, 0, 71, 0.5)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°F)'
            }
          },
          x: {
            display: true,
            title: {
              display: true,
              text: 'Period'
            }
          }
        }
      }
    });
  }

  renderChart2(): void {
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: this.temperatureData2.map(period => period.name),
        datasets: [
          {
            label: 'Columbia Weather',
            data: this.temperatureData2.map(period => period.temperature),
            borderColor: 'rgba(0, 255, 71, 0.5)',
            backgroundColor: 'rgba(192, 75, 192, 0.2)',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°F)'
            }
          },
          x: {
            display: true,
            title: {
              display: true,
              text: 'Period'
            }
          }
        }
      }
    });
  }
}
