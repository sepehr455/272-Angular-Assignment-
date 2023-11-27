export class Report {
  baddieName: string;
  location: string;
  reporterName: string;
  reporterPhone: string;
  reportDate: string;
  reportTime: string;
  status: "Open" | "Resolved";
  extraInfo: string;

  constructor(baddieName: string, location: string, reporterName: string, reporterPhone: string, reportDate: string, reportTime: string, status: "Open" | "Resolved", extraInfo: string) {
    this.baddieName = baddieName;
    this.location = location;
    this.reporterName = reporterName;
    this.reporterPhone = reporterPhone;
    this.reportDate = reportDate;
    this.reportTime = reportTime;
    this.status = status;
    this.extraInfo = extraInfo;
  }
}
