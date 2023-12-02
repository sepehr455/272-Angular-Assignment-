import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from "../map/map.component";
import {RouterOutlet} from "@angular/router";
import {ReportService} from "../ReportService";
import {Report} from "../Report";
import {HttpClientModule} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {PasswordPromptComponent} from "../password-prompt/password-prompt.component";

@Component({
  selector: 'app-display-reports',
  standalone: true,
  imports: [CommonModule, MapComponent, RouterOutlet, HttpClientModule],
  templateUrl: './display-reports.component.html',
  styleUrl: './display-reports.component.css'
})
export class DisplayReportsComponent implements OnInit {
  reports: Report[];

  constructor(private reportService: ReportService, private dialog: MatDialog) {
    this.reports = [];
  }

  deleteReport(id: string) {
    this.reportService.deleteReport(id);
  }

  setStatusToResolved(id: string) {
    this.reportService.setStatusToResolved(id);
  }

  displayDeletePopUp(id: string) {
    this.dialog.open(PasswordPromptComponent, {
      width: '300px',
      height: '200px',
      panelClass: 'custom-dialog-container',
      data: {
        confirmAction: () => {
          this.deleteReport(id);
        }
      }
    });
  }

  displayEditPopUp(id: string) {
    this.dialog.open(PasswordPromptComponent, {
      width: '300px',
      height: '200px',
      panelClass: 'custom-dialog-container',
      data: {
        confirmAction: () => {
          this.setStatusToResolved(id);
        }
      }
    });
  }

  ngOnInit(): void {
    this.reports = this.reportService.getReports();
  }
}
