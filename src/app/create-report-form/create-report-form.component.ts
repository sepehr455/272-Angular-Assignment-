import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Report} from "../Report";
import {ReportService} from "../ReportService";

@Component({
  selector: 'app-create-report-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-report-form.component.html',
  styleUrl: './create-report-form.component.css'
})
export class CreateReportFormComponent implements OnInit{
  newReport: Report = new Report('', '', '', '', '', '', 'Open', '');

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {

  }

}
