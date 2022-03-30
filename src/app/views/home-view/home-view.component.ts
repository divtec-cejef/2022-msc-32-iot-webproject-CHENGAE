import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const DEFAULT_DEVICE: string = '18E231';
const DEFAULT_ROOM: string = 'B1-05';

interface measure {
  "id": number,
  "temperature": number,
  "humidity": number,
  "time": number,
  "id_device": number,
  "id_room": number,
  "room": {
    "id": number,
    "name": string
  },
  "device": {
    "id": number,
    "name": string,
    "identifier": string
  }
}

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})

export class HomeViewComponent implements OnInit {
  measures: Array<measure> = [];
  myMeasure: Array<measure> = [];

  date: any = new Date();
  yesterday: any = new Date(this.date - 24 * 60 * 60 * 1000);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://chengae.divtec.me/temperature/public/api/measures').subscribe((response : any) => {
      this.measures = response;
      this.myMeasure = response;

      this.myMeasure = this.myMeasure.filter(measure => measure.device.identifier == DEFAULT_DEVICE);
      this.myMeasure = this.myMeasure.filter(measure => measure.room.name == DEFAULT_ROOM);

      console.log(this.myMeasure.filter(measure => new Date(measure.time * 1000) >= this.yesterday));
    });
  }

  getLastMeasure(): measure {
    return this.myMeasure[0];
  }

  getMinTemperature(): number {
    let dayData: Array<measure> = this.myMeasure.filter(measure => new Date(measure.time * 1000) >= this.yesterday);
    let minTemperature = dayData[0].temperature;

    dayData.forEach(mesure => {
      if (mesure.temperature <= minTemperature) {
        minTemperature = mesure.temperature;
      }
    });

    return minTemperature;
  }

  getMaxTemperature(): number {
    let dayData: Array<measure> = this.myMeasure.filter(measure => new Date(measure.time * 1000) >= this.yesterday);
    let maxTemperature = dayData[0].temperature;

    dayData.forEach(mesure => {
      if (mesure.temperature >= maxTemperature) {
        maxTemperature = mesure.temperature;
      }
    });

    return maxTemperature;
  }

  getMinHumidity(): number {
    let dayData: Array<measure> = this.myMeasure.filter(measure => new Date(measure.time * 1000) >= this.yesterday);
    let minHumidity = dayData[0].humidity;

    dayData.forEach(mesure => {
      if (mesure.humidity <= minHumidity) {
        minHumidity = mesure.humidity;
      }
    });

    return minHumidity;
  }

  getMaxHumidity(): number {
    let dayData: Array<measure> = this.myMeasure.filter(measure => new Date(measure.time * 1000) >= this.yesterday);
    let maxHumidity = dayData[0].humidity;

    dayData.forEach(mesure => {
      if (mesure.humidity >= maxHumidity) {
        maxHumidity = mesure.humidity;
      }
    });

    return maxHumidity;
  }

  getDefaultDevice(): string {
    return DEFAULT_DEVICE;
  }

  getDefaultRoom(): string {
    return DEFAULT_ROOM;
  }

  getDay(pTime: number): any {
    const dateTime: Date = new Date(pTime * 1000);
    let result;

    switch (dateTime.getDay()) {
      case 1 :
        result = 'Lundi';
        break;
      case 2 :
        result = 'Mardi';
        break;
      case 3 :
        result = 'Mercredi';
        break;
      case 4 :
        result = 'Jeudi';
        break;
      case 5 :
        result = 'Vendredi';
        break;
      case 6 :
        result = 'Samedi';
        break;
      default :
        result = 'Dimanche';
        break;
    }

    return result;
  }

  getDate(pTime: number): any {
    const dateTime: Date = new Date(pTime * 1000);

    let month;
    switch (dateTime.getMonth()) {
      case 0 :
        month = 'Janv.';
        break;
      case 1 :
        month = 'Fév.';
        break;
      case 2 :
        month = 'Mars';
        break;
      case 3 :
        month = 'Avr.';
        break;
      case 4 :
        month = 'Mai';
        break;
      case 5 :
        month = 'Juin';
        break;
      case 6 :
        month = 'Juil.';
        break;
      case 7 :
        month = 'Août';
        break;
      case 8 :
        month = 'Sept.';
        break;
      case 9 :
        month = 'Oct.';
        break;
      case 10 :
        month = 'Nov.';
        break;
      case 11 :
        month = 'Déc.';
        break;
    }

    return dateTime.getDate() + ' ' + month + ' ' + dateTime.getFullYear();
  }

  getHours(pTime: number): any {
    const dateTime: Date = new Date(pTime * 1000);
    let hours: any = dateTime.getHours();
    let minutes: any = dateTime.getMinutes();

    if (hours < 10)
      hours = '0' + hours;

    if (minutes < 10)
      minutes = '0' + minutes;

    return hours + ':' + minutes;
  }

  getFullDate(pTime: number): any {
    return this.getDay(pTime) + " " + this.getDate(pTime) + ", " + this.getHours(pTime);
}
}
