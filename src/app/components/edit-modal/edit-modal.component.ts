import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
  "identifier": string,
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  devices: Array<devices> = [];

  postId: any;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: measure) { }

  ngOnInit(): void {
    this.http.get('https://chengae.divtec.me/temperature/public/api/devices').subscribe((response : any) => {
      //console.log(response);
      this.devices = response;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  submitModal() {
    let newTemperature: any = (document.getElementById('editTemperature') as HTMLInputElement).value;
    let newHumidity: any = (document.getElementById('editHumidity') as HTMLInputElement).value;

    let body = {
      "temperature": newTemperature,
      "humidity": newHumidity,
      "time": this.data.time,
      "id_device" : this.data.id_device,
      "id_room" : this.data.id_room,
    }

    this.http.put<any>('https://chengae.divtec.me/temperature/public/api/measures/' + this.data.id, body).subscribe(data => this.postId = data.id);

    this.closeModal();
  }
}
