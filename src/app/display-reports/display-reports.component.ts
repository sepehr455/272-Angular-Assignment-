import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Report} from "../Report";
import {MapComponent} from "../map/map.component";
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-display-reports',
    standalone: true,
    imports: [CommonModule, MapComponent, RouterOutlet],
    templateUrl: './display-reports.component.html',
    styleUrl: './display-reports.component.css'
})
export class DisplayReportsComponent {
    reports: Report[];

    constructor() {
        this.reports = [
            new Report('Baddie 1', 'Location 1', 'Reporter 1', 'Phone 1', 'Date 1', 'Time 1', 'Open', 'Extra 1'),
            new Report('Baddie 2', 'Location 2', 'Reporter 2', 'Phone 2', 'Date 2', 'Time 2', 'Open', 'Extra 2'),
            new Report('Baddie 3', 'Location 3', 'Reporter 3', 'Phone 3', 'Date 3', 'Time 3', 'Open', 'Extra 3'),
            ]
    }

}
