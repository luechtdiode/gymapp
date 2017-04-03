import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'splitCurrency'})
export class ShiftPosition implements PipeTransform {
  transform(items: any[], value: string): string {
    if (!items) { 
      items = ['0.00']; 
    }
    const text = items.toString();
    const sortOutNumbers = text.search(/[0-9]|\./);
    return text.substr(0, sortOutNumbers) + ' ' + text.substr(sortOutNumbers);
  }
}