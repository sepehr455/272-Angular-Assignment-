import {Injectable} from '@angular/core';
import {Report} from './Report';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})


export class ReportService {
  private apiUrl = 'https://272.selfip.net/apps/L8N4sU0a3T/collections/data1/documents/';

  constructor(private http: HttpClient) {
  }

  private reports: Report[] = [];

  updateReports() {
    this.reports = [];
    this.http.get(this.apiUrl).subscribe((responses: any) => {
      responses.forEach((response: any) => {
        const currentReport = {
          id: response.key,
          baddieName: response.data.baddieName,
          location: response.data.location,
          reporterName: response.data.reporterName,
          reporterPhone: response.data.reporterPhone,
          reportDate: response.data.reportDate,
          reportTime: response.data.reportTime,
          status: response.data.status,
          extraInfo: response.data.extraInfo,
          image: response.data.image
        };
        this.reports.push(currentReport);
      });
    });
  }

  getReports(): Report[] {
    this.updateReports();
    return this.reports;
  }


  addReport(report: Report){
    this.reports.push(report);
    const requestObj = {
      "key": report.id,
      "data": {
        "baddieName": report.baddieName,
        "location": report.location,
        "reporterName": report.reporterName,
        "reporterPhone": report.reporterPhone,
        "reportDate": report.reportDate,
        "reportTime": report.reportTime,
        "status": report.status,
        "extraInfo": report.extraInfo
      }
    }

    this.http.post(this.apiUrl, requestObj).subscribe((response) => {
      console.log(response);
    }
    );
  }

  deleteReport(id: string) {
    this.reports = this.reports.filter(report => report.id !== id);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      console.log(`deleted ${id}`);
    });
  }

  setStatusToResolved(id: string) {
    const requestObj = {
      "key": id,
      "data": {
        "status": "Resolved"
      }
    }
    this.http.put(this.apiUrl, requestObj).subscribe((response) => {
      console.log(response);
    }
    );
  }
}
