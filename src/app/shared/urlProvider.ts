import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

declare var window: any;

@Injectable()
export class UrlProvider {
  originHRef: string = window.location.origin;

  public static getBackendUrl(path: string): string {
    // let host: string = window.location.hostname;
    // if (host === 'localhost') {
    //   return 'http://localhost:4200' + path;
    // } else if (host === '127.0.0.1') {
    //   return 'http://127.0.0.1:4200' + path;
    // }
    return window.location.origin + path;
  }

  constructor(private location: Location) { }

  activeLocation() {
    return this.location.path();
  }
}
