import {Injectable} from '@angular/core';
import {Location, Report} from './Report';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})


export class ReportService {
  private apiUrl = 'https://272.selfip.net/apps/L8N4sU0a3T/collections/data1/documents/';
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  public reports$ = this.reportsSubject.asObservable();

  private locationsSubject = new BehaviorSubject<Location[]>([]);
  public locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  private reports: Report[] = [];
  private locations: Location[] = [];



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
        this.reportsSubject.next(this.reports);
        this.reports.push(currentReport);
        this.updateLocations();
      });
    });
  }

  getReports() {
    this.updateReports();
    return this.reports$;
  }


  addReport(report: Report) {
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
        "extraInfo": report.extraInfo,
        "image": report.image,
      }
    }

    this.http.post(this.apiUrl, requestObj).subscribe({
        next: (response) => {
          this.reports.push(report);
          this.reportsSubject.next(this.reports);
          this.updateReports();
          this.updateLocations();
        }
      }
    );
    return this.http.post(this.apiUrl, requestObj);
  }

  deleteReport(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        const index = this.reports.findIndex(report => report.id === id);
        if (index !== -1) {
          this.reports.splice(index, 1);
          this.reportsSubject.next(this.reports);
          this.updateReports();
          this.updateLocations();
        }
      },
    });
  }

  getReportById(id: string): Observable<Report | null> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        if (!response) {
          return null;
        }
        return {
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
      }),
    );
  }


  setStatusToResolved(id: string) {
    this.getReportById(id).subscribe((report) => {
      if (!report) {
        console.error('Report not found');
        return;
      }

      // Clone the report object to avoid direct mutation
      const requestObj = {
        "key": report.id,
        "data": {
          "baddieName": report.baddieName,
          "location": report.location,
          "reporterName": report.reporterName,
          "reporterPhone": report.reporterPhone,
          "reportDate": report.reportDate,
          "reportTime": report.reportTime,
          "status": 'Resolved',
          "extraInfo": report.extraInfo
        }
      }

      // Send the updated report object to the server
      this.http.put(`${this.apiUrl}/${id}`, requestObj).subscribe({
        next: (response) => {
          console.log(response);

          // Update the local array of reports
          this.reports = this.reports.map((report) => {
              if (report.id === id) {
                return {...report, status: 'Resolved'};
              }

              return report;
            }
          );
          this.reportsSubject.next(this.reports);
        },
      });
    });
  }

  private updateLocations() {
    const locationMap: { [key: string]: Location } = {};

    this.reports.forEach(report => {
      const locationKey = `${report.location.xCoord},${report.location.yCoord}`;

      if (!locationMap[locationKey]) {
        locationMap[locationKey] = {
          name: report.location.name,
          xCoord: report.location.xCoord,
          yCoord: report.location.yCoord,
          numberOfReports: 1
        };
      } else {
        locationMap[locationKey].numberOfReports++;
      }
    });

    this.locations = Object.values(locationMap);
    this.locationsSubject.next(this.locations);
  }

  getLocations() {
    this.updateLocations();
    return this.locations$;
  }

}
