import { Component, OnInit, Input } from '@angular/core';
import { IssueService } from '../../service/issue.service';
import { Router } from '@angular/router';
import {PageEvent } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayColumns = ['title', 'author', 'category', 'heroes', 'description', 'owner', 'emial', 'access', 'imagePath'];
  totalBook = 10;
  bookPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20, 25, 30];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {

     this.fetchIssues(this.bookPerPage, this.currentPage);
     this.lenght();
  }
lenght() {
  this.issueService.getLenght().subscribe((issuesLenght: Issue[]) => {
this.totalBook = issuesLenght.length;
  });
}
 fetchIssues(bookPerPage, currentPage) {
   this.issueService.getIssues(this.bookPerPage, this.currentPage).subscribe((data: Issue[]) => {
 this.issues = data;

  return this.issues.slice();
   });
 }
 onChangePage(pageData: PageEvent) {
  this.currentPage = pageData.pageIndex + 1;
  this.bookPerPage = pageData.pageSize;
this.fetchIssues(this.bookPerPage, this.currentPage);

  }

 editIssue(id) {
   this.router.navigate([`/edit/${id}`]);
 }

 deleteIssues(id) {
   this.issueService.deleteIssues(id).subscribe(() => {
     this.fetchIssues(this.bookPerPage, this.currentPage);
   });
 }
 detalsForm(id) {
   this.router.navigate([`/detal/${id}`]);

 }

}
