import { Component, OnInit, Input } from '@angular/core';
import { IssueService } from '../../service/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Issue } from '../../issue.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-detal',
  templateUrl: './detal.component.html',
  styleUrls: ['./detal.component.scss']
})
export class DetalComponent implements OnInit {
  book: any = {};
  id: String;
  detalForm: FormGroup;
  issues: Issue[];
  totalBook = 10;
  bookPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [];

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.detalsForm();
  }

  detalsForm() {
    this.detalForm = this.fb.group({
      title: '',
      author: '',
      category: '',
      heroes: '',
      description: '',
      email: '',
      owner: '',
      access: '',
      image: '',
      imagePath: ''
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
  fetchIssues() {
    this.issueService
      .getIssues(this.bookPerPage, this.currentPage)
      .subscribe((data: Issue[]) => {
        this.issues = data;
        return this.issues;
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssuesById(this.id).subscribe(res => {
        this.book = res;
        this.detalForm.get('title').setValue(this.book.title);
        this.detalForm.get('author').setValue(this.book.author);
        this.detalForm.get('category').setValue(this.book.category);
        this.detalForm.get('heroes').setValue(this.book.heroes);
        this.detalForm.get('description').setValue(this.book.description);
        this.detalForm.get('email').setValue(this.book.email);
        this.detalForm.get('owner').setValue(this.book.owner);
        this.detalForm.get('access').setValue(this.book.access);
        this.detalForm.get('image').setValue(this.book.image);
        this.detalForm.get('imagePath').setValue(this.book.imagePath);
      });
    });
  }
}
