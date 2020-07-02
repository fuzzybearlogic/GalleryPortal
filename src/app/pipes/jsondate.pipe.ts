import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'jsondate'})
export class JSONDate implements PipeTransform {
  transform(value: string): string {
    const dateStr = JSON.parse(JSON.stringify(value));
    const date = new Date(dateStr);
    return String(date);

  }
}
