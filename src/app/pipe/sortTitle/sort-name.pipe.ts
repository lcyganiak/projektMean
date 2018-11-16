import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName'
})
export class SortNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value;
  }
}
