import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionList'
})
export class DescriptionListPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.substr(0, 60) + ' ...';
  }
}
