import {Component, Inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Report} from "../Report";

@Component({
  selector: 'app-report-detais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  @Input() report!: Report;

  constructor(
      public dialogRef: MatDialogRef<ReportDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {report: Report}
  ) {}

  close() {
    this.dialogRef.close();
  }

}
