import {Component, Inject, OnInit} from '@angular/core';
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  status: any;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  submitModal() {
    console.log(this.data);

    let options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: 1,
        name: 'test',
      },
    };

    this.http.delete('https://chengae.divtec.me/temperature/public/api/measures/' + this.data).subscribe(() => this.status = 'Delete successful');

    console.log(this.status);

    //this.http.delete('https://chengae.divtec.me/temperature/public/api/measures/' + this.data);

    this.closeModal();
  }
}
