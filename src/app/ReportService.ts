import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://272.selfip.net/apps/L8N4sU0a3T/collections/AngularAssignment/documents';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  getReportById(id: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  addReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, report);
  }

  deleteReport(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
