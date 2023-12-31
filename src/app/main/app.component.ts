import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "../map/map.component";
import {DisplayReportsComponent} from "../display-reports/display-reports.component";
import {CreateButtonComponent} from "../create-button/create-button.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent, DisplayReportsComponent, CreateButtonComponent, HttpClientModule]
})
export class AppComponent {
  title = 'AngularAssignment';
}
