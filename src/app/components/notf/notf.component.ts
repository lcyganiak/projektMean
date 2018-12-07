import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-notf',
  templateUrl: './notf.component.html',
  styleUrls: ['./notf.component.scss']
})
export class NotfComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
  }

}
