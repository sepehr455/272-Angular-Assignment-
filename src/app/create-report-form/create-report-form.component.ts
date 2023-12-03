import {AfterViewInit, Component} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {Report} from "../Report";

import {ReportService} from "../ReportService";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MapComponent} from "../map/map.component";
import {HttpClientModule} from "@angular/common/http";
import * as L from "leaflet";
import {icon, Marker} from "leaflet";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-create-report-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent, HttpClientModule],
  templateUrl: './create-report-form.component.html',
  styleUrl: './create-report-form.component.css'
})
export class CreateReportFormComponent implements AfterViewInit {
  form: FormGroup;
  private map!: L.Map;
  private currentMarker: L.Marker | null = null;


  constructor(private reportService: ReportService) {
    let formControls = {
      baddieName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      locationName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      reporterName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      reporterPhone: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9 .'-]+"),
        Validators.minLength(10)
      ]),
      status: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      extraInfo: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
    }
    this.form = new FormGroup(formControls);
  }

  onSubmit(newReport: Report) {
    console.log(newReport);

  }

  ngAfterViewInit(): void {
    this.map = L.map('formMap').setView([49.2, -123], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
          'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(this.map);
    this.map.on('click', this.onMapClick.bind(this));
  }

  onMapClick(e: L.LeafletMouseEvent): void {
    // Log the coordinates
    console.log(`Clicked at latitude: ${e.latlng.lat}, longitude: ${e.latlng.lng}`);
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    // Create and add the marker to the map
    this.currentMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map)


    // Bind a popup to the marker (optional)
  }


  createReport(): void {
    const now = new Date();
    const formattedDate = formatDate(now, 'MMMM d', 'en-US');
    const formattedTime = formatDate(now, 'h:mm a', 'en-US').toLowerCase();

    //getting the number of reports in the location
    let numberOfReports: number = 0;

    this.reportService.getLocations().subscribe(locations => {
      locations.forEach(location => {
          if (location.name === this.form.value.locationName) {
            numberOfReports = location.numberOfReports;
          }
        }
      );
    });

    let newReport = new Report(
      this.form.value.baddieName,
      {
        name: this.form.value.locationName,
        xCoord: this.currentMarker?.getLatLng().lat || 0,
        yCoord: this.currentMarker?.getLatLng().lng || 0,
        numberOfReports: numberOfReports
      },
      this.form.value.reporterName,
      this.form.value.reporterPhone,
      formattedDate,
      formattedTime,
      "Open",
      this.form.value.extraInfo,
      this.form.value.image);
    this.reportService.addReport(newReport);
  }
}
