import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from "../map/map.component";
import {RouterOutlet} from "@angular/router";
import {ReportService} from "../ReportService";
import {Report} from "../Report";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-display-reports',
  standalone: true,
  imports: [CommonModule, MapComponent, RouterOutlet, HttpClientModule],
  templateUrl: './display-reports.component.html',
  styleUrl: './display-reports.component.css'
})
export class DisplayReportsComponent implements OnInit {
  reports!: Report[];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reports = this.reportService.getReports();
  }

}
