import {Injectable} from '@angular/core';
import {Report} from './Report';
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})


export class ReportService {
  private apiUrl = 'https://272.selfip.net/apps/L8N4sU0a3T/collections/data1/documents/';

  constructor(private http: HttpClient) {
  }

  private reports: Report[] = [];

  getReports(): Report[] {
    return this.reports;
  }

  addReport(report: Report): void {
    this.reports.push(report);
    const requestObj = {
      "key": report.id,
      "data": {
        "baddieName": report.baddieName.toString(),
        "location": report.location.toString(),
        "reporterName": report.reporterName.toString(),
        "reporterPhone": report.reporterPhone.toString(),
        "reportDate": report.reportDate.toString(),
        "reportTime": report.reportTime.toString(),
        "status": report.status.toString(),
        "extraInfo": report.extraInfo.toString()
      }
    }

    this.http.post(this.apiUrl, requestObj).subscribe((response) => {
      console.log(response);
    }
    );
  }
}


//   getReports(): Observable<Report[]> {
//     return this.http.get<Report[]>(this.apiUrl);
//   }
//
//   getReportById(id: string): Observable<Report> {
//     return this.http.get<Report>(`${this.apiUrl}/${id}`);
//   }
//
//   addReport(report: Report): Observable<Report> {
//     return this.http.post<Report>(this.apiUrl, report);
//   }
//
//   deleteReport(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }
