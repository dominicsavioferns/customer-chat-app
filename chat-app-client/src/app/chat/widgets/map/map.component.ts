import { transition, trigger, useAnimation } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SecurityContext,
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { entryAnimation } from '../../entry.animation';

@Component({
  selector: 'ott-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(entryAnimation, {
          params: {
            opacity: '0%',
            time: '600ms',
          },
        }),
      ]),
    ]),
  ],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() height!: number;
  @Input() width!: number;
  @Input() author!: string;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.changeDetector.detach();
  }

  ngOnInit(): void {}

  public getMapsUrl(): SafeResourceUrl {
    const url = environment.googleMapsUrl
      .replace('{lat}', this.latitude.toString())
      .replace('{key}', environment.googleApiKey)
      .replace('{long}', this.longitude.toString());
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
