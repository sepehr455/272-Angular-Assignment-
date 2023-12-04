import {AfterViewInit, Component} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {Location, Report} from "../Report";

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
    public isExistingLocationSelected: boolean = false;
    public locations: Location[] = [];
    public mapKey: number = 0;
    reporterPhone = new FormControl('');

    constructor(private reportService: ReportService) {
        let formControls = {
            baddieName: new FormControl('', [
                Validators.required,
            ]),
            locationName: new FormControl('', [
                Validators.required,
            ]),
            reporterName: new FormControl('', [
                Validators.required,
            ]),
            reporterPhone: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)
            ]),
            extraInfo: new FormControl(''),
            image: new FormControl('', [
                Validators.required,
            ]),
            locationSelectionMethod: new FormControl('new'),
            existingLocation: new FormControl('',
                [
                    Validators.required
                ]),
        }


        //setting the default value of the dropdown
        this.reportService.getLocations().subscribe(data => {
            this.locations = data;
            if (this.locations.length > 0) {
                this.form.controls['existingLocation'].setValue(this.locations[0].name);
            }
        });

        this.form = new FormGroup(formControls);
        this.reportService.getLocations().subscribe(data => {
            this.locations = data;
        });

        this.form.get('reporterPhone')!.valueChanges.subscribe(value => {
            this.formatPhoneNumber(value);
        });


    }

    //for formatting the phone number
    private formatPhoneNumber(value: string): void {
        if (value && value.length > 0) {
            let formattedValue = value.replace(/\D/g, '').slice(0, 10); // Remove non-digits and limit to 10
            if (formattedValue.length >= 4 && formattedValue.length <= 6) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 6) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 6)}-${formattedValue.slice(6)}`;
            }
            if (value !== formattedValue) {
                this.form.get('reporterPhone')!.setValue(formattedValue, {emitEvent: false});
            }
        }
    }


    onSubmit(): void {
        if (this.form.valid) {
            this.createReport();
        } else {
            this.form.markAllAsTouched();
            //print the field that is not valid
            console.error("Form is not valid");
        }
    }

    private initializeMap(): void {
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
        //setting a default marker
        this.currentMarker = L.marker([49.2, -123]).addTo(this.map);
        this.map.on('click', this.onMapClick.bind(this));
    }

    ngAfterViewInit(): void {
        if (!this.isExistingLocationSelected) {
            this.initializeMap();
        }
    }

    toggleLocationSelection(isExisting: boolean): void {
        this.isExistingLocationSelected = isExisting;
        if (!isExisting) {
            this.mapKey++; // Increment key to force re-render
            setTimeout(() => this.initializeMap());
        }
    }

    onMapClick(e: L.LeafletMouseEvent): void {
        // Log the coordinates
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

        let location;
        if (this.isExistingLocationSelected) {
            // If existing location is selected, find the location from the locations array
            const selectedLocation = this.locations.find(loc => loc.name === this.form.value.existingLocation);
            if (selectedLocation) {
                location = {
                    ...selectedLocation,
                    numberOfReports: selectedLocation.numberOfReports + 1
                };
            } else {
                console.error("Selected location not found");
                return;
            }
        } else {
            // If a new location is selected, create a new location object
            location = {
                name: this.form.value.locationName,
                xCoord: this.currentMarker?.getLatLng().lat || 0,
                yCoord: this.currentMarker?.getLatLng().lng || 0,
                numberOfReports: 1
            };
        }

        let newReport = new Report(
            this.form.value.baddieName,
            location,
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
