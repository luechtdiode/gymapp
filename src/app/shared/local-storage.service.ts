import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    if (!localStorage) {
      throw new Error('No Local Storage api available in this browser');
    }
    this.storage = localStorage;
  }

  public store(key: string, value: string): void {
    this.storage[key] = value;
  }

  public get(key: string, defaultValue = ''): string {
    return this.storage[key] || defaultValue;
  }

  public storeObject(key: string, value: any): void {
    this.storage[key] = JSON.stringify(value);
  }

  public getObject(key: string, defaultValue = {}): any {
    return JSON.parse(this.storage[key] || JSON.stringify(defaultValue));
  }

  public remove(key: string): any {
    this.storage.removeItem(key);
  }

}
