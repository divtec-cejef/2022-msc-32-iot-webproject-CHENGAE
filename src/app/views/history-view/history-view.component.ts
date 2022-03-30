import {Component, OnInit} from '@angular/core';
import {EditModalComponent} from "../../components/edit-modal/edit-modal.component";
import {DeleteModalComponent} from "../../components/delete-modal/delete-modal.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

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

interface devices {
  "id": number,
  "name": string,
  "identifier": string
}

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss']
})
export class HistoryViewComponent implements OnInit {
  measures: Array<measure> = [];
  devices: Array<devices> = [];
  dataMeasures: Array<measure> = [];
  dialogConfig = new MatDialogConfig();
  modalEditDialog: MatDialogRef<EditModalComponent, any> | undefined;
  modalDeleteDialog: MatDialogRef<DeleteModalComponent, any> | undefined;

  constructor(private http: HttpClient, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.http.get('https://chengae.divtec.me/temperature/public/api/measures').subscribe((response : any) => {
      //console.log(response);
      this.measures = response;
      this.dataMeasures = response;
    });

    this.http.get('https://chengae.divtec.me/temperature/public/api/devices').subscribe((response : any) => {
      //console.log(response);
      this.devices = response;
    });

    function hideloader() {
      // @ts-ignore
      document.getElementById('loading').style.display = 'none';
    }
  }

  getByFilter(): void {
    this.measures = this.dataMeasures;

    let frmDevice: number = parseInt((document.getElementById('filterDevices') as HTMLInputElement).value);
    let frmDate: any = (document.getElementById('filterDate') as HTMLInputElement).value;

    if (frmDevice != -1) {
      this.measures = this.measures.filter(measure => measure.id_device == frmDevice);
    }

    if (frmDate != '') {
      this.measures = this.measures.filter(measure => this.getDateForm(new Date(measure.time * 1000)) == frmDate);
    }


  }

  resetFilter(): void {
    (document.getElementById('filterDevices') as HTMLInputElement).value = '-1';
    (document.getElementById('filterDate') as HTMLInputElement).value = '';
    this.measures = this.dataMeasures;
  }

  openEditModal(pEditMeasure: measure) {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.data = pEditMeasure;
    this.modalEditDialog = this.matDialog.open(EditModalComponent, this.dialogConfig);
  }

  openDeleteModal(pId: number) {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.data = pId;
    this.modalDeleteDialog = this.matDialog.open(DeleteModalComponent, this.dialogConfig);
  }

  getDay(pTime: number): any {
    const dateTime: Date = new Date(pTime * 1000);
    let result;

    switch (dateTime.getDay()) {
      case 1 :
        result = 'LUN';
        break;
      case 2 :
        result = 'MAR';
        break;
      case 3 :
        result = 'MER';
        break;
      case 4 :
        result = 'JEU';
        break;
      case 5 :
        result = 'VEN';
        break;
      case 6 :
        result = 'SAM';
        break;
      default :
        result = 'DIM';
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

  getDateMin(): Date {
    let idDateMin: any = this.dataMeasures.length - 1;
    return new Date(this.dataMeasures[idDateMin].time * 1000);
  }

  getDateNow(): Date {
    return new Date();
  }

  getDateForm(pDate: Date): string {
    let year: any = pDate.getFullYear();
    let month: any = pDate.getMonth() + 1;
    let date: any = pDate.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (date < 10) {
      date = "0" + date;
    }

    return year + "-" + month + "-" + date;
  }
}
