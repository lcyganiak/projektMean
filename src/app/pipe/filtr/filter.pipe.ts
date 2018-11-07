import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from 'src/app/issue.model';
import { IssueService } from 'src/app/service/issue.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<Issue>, args?: any) {
  console.log(value);
    return value;
  }

}
