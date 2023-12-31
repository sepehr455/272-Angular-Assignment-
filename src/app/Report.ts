import { v4 as uuidv4 } from 'uuid';

export type Location = {
  name: string;
  xCoord: number;
  yCoord: number;
  numberOfReports: number;
}

export class Report {
  id: string;
  baddieName: string;
  location: Location;
  reporterName: string;
  reporterPhone: string;
  reportDate: string;
  reportTime: string;
  status: "Open" | "Resolved";
  extraInfo: string;
  image: string;

  constructor(baddieName: string, location: Location, reporterName: string, reporterPhone: string, reportDate: string, reportTime: string, status: "Open" | "Resolved", extraInfo: string, image: string) {
    this.id = uuidv4();    this.baddieName = baddieName;
    this.location = location;
    this.reporterName = reporterName;
    this.reporterPhone = reporterPhone;
    this.reportDate = reportDate;
    this.reportTime = reportTime;
    this.status = status;
    this.extraInfo = extraInfo;
    this.image = image;
  }
}
