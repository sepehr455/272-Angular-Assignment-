import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateReportFormComponent} from "../create-report-form/create-report-form.component";

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './create-button.component.html',
  styleUrl: './create-button.component.css'
})
export class CreateButtonComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(CreateReportFormComponent, {
      width: '700px',
      height: '800px',
      panelClass: 'custom-dialog-container',
      // additional configurations if needed
    });
  }

}
