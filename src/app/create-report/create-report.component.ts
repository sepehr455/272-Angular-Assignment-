import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Report} from "../Report";
import {ReportService} from "../ReportService";

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})
export class CreateReportComponent implements OnInit{
  newReport: Report = new Report('', '', '', '', '', '', 'Open', '');

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {

  }

}
