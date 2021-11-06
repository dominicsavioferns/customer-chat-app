import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ott-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() height!: number;
  @Input() width!: number;
  @Input() author!: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  public getMapsUrl(): SafeResourceUrl {
    const url = environment.googleMapsUrl
      .replace('{lat}', this.latitude.toString())
      .replace('{key}', environment.googleApiKey)
      .replace('{long}', this.longitude.toString());
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
