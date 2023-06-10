import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToWords',
})
export class CamelCaseToWordsPipe implements PipeTransform {
  transform(value: string): string {
    const spacedString = value.replace(/([A-Z])/g, ' $1');
    return spacedString.trim();
  }
}
