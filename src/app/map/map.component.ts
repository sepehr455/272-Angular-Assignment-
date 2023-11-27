import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon, Marker} from 'leaflet';

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
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.css'

})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.map = L.map('mapId').setView([49.2, -123], 11);
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

    L.marker([49.2276, -123.0076]).addTo(this.map)
      .bindPopup('<b>Metrotown</b><br>cases reported').openPopup();

    L.marker([49.1867, -123.8490]).addTo(this.map)
      .bindPopup('<b>SFU Surrey</b><br>cases reported').openPopup();
  }
}
