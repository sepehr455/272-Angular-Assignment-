import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Report} from "../Report";

import {ReportService} from "../ReportService";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MapComponent} from "../map/map.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-create-report-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent, HttpClientModule],
  templateUrl: './create-report-form.component.html',
  styleUrl: './create-report-form.component.css'
})
export class CreateReportFormComponent {
  baddieName: string;
  form: FormGroup;


  constructor(private reportService: ReportService) {
    this.baddieName = '';
    let formControls = {
      baddieName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      location: new FormControl('', [
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
      reportDate: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9 .'-]+"),
        Validators.minLength(2)
      ]),
      reportTime: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9 .'-]+"),
        Validators.minLength(2)
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

  createReport(): void {
    const newReport = new Report(
      'Baddie 1',
      {
        name: 'Location 1',
        xCoord: 1,
        yCoord: 1
      },
      'Reporter 1',
      'Phone 1',
      'Date 1',
      'Time 1',
      'Open',
      'Extra 1',
      'Image 1');
    this.reportService.addReport(newReport);
  }

}
