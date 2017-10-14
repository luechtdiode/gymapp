import { Injectable, Inject } from '@angular/core';
import { Location, APP_BASE_HREF } from '@angular/common';

declare var window: any;

@Injectable()
export class UrlProvider {
  originHRef: string;

  public getBackendUrl(path: string): string {
    return this.originHRef + path;
  }

  constructor(private location: Location,
              @Inject(APP_BASE_HREF) private baseHref: string) {
    this.originHRef = window.location.origin + baseHref;
  }

  activeLocation() {
    return this.location.path();
  }
}
