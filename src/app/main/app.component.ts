import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from "../map/map.component";
import {DisplayReportsComponent} from "../display-report/display-reports.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
    imports: [CommonModule, RouterOutlet, MapComponent, DisplayReportsComponent]
})
export class AppComponent {
  title = 'AngularAssignment';
}
