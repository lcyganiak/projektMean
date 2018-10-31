import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from 'src/app/issue.model';
import { IssueService } from 'src/app/service/issue.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
