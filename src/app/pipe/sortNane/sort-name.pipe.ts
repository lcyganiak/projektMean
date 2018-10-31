import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../../issue.model';
import { IssueService } from 'src/app/service/issue.service';
import { Title } from '@angular/platform-browser';


@Pipe({
  name: 'sortName'
})

export class SortNamePipe implements PipeTransform {
  // issues: Issue<Array>;

  transform(value: string, args?: any): any {
    return value;
  }

}
