import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

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
    return '.' + path;
  }

  constructor(private location: Location) { }

  activeLocation() {
    return this.location.path();
  }
}
