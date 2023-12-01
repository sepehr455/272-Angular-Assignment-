import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Report} from "../Report";

import {MatDialog} from "@angular/material/dialog";
import {ReportService} from "../ReportService";

@Component({
  selector: 'app-create-report-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-report-form.component.html',
  styleUrl: './create-report-form.component.css'
})
export class CreateReportFormComponent {
  constructor(private reportService: ReportService) {
  }

  createReport(): void {
    const newReport = new Report(
      'Baddie 1',
      'Location 1',
      'Reporter 1',
      'Phone 1',
      'Date 1',
      'Time 1',
      'Open',
      'Extra 1');
    this.reportService.addReport(newReport);
  }

}
