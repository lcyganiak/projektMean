import { Component, OnInit, Input } from '@angular/core';
import { IssueService } from '../../service/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayColumns = ['title', 'author', 'category', 'heroes', 'description', 'owner', 'emial', 'access'];



  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();



  }
 fetchIssues() {
   this.issueService.getIssues().subscribe((data: Issue[]) => {
 this.issues = data;
  return this.issues.slice();
   });
 }
 editIssue(id) {
   this.router.navigate([`/edit/${id}`]);
 }
 deleteIssues(id) {
   this.issueService.deleteIssues(id).subscribe(() => {
     this.fetchIssues();
   });
 }
 detalsForm(id) {
   this.router.navigate([`/detal/${id}`]);
 }
}
