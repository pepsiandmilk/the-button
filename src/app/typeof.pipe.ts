import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeof',
})
export class TypeofPipe implements PipeTransform {
  transform(whomst: any): any {
    return typeof whomst;
  }
}
