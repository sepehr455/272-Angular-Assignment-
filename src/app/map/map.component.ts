import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.css'

})
export class MapComponent implements OnInit {

  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([49.2827, -123.1207], 13); // Coordinates for Vancouver

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
