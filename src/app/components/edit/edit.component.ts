import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/service/issue.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Issue } from '../../issue.model';
import { MatSnackBar } from '@angular/material';
import { imgType } from '../add/img-validatot';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: String;
  issue: any = {};
  updateForm: FormGroup;
  imagePreview: string;
  totalBook = 10;
  bookPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [];

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      title: '',
      author: '',
      category: '',
      heroes: '',
      description: '',
      email: '',
      owner: '',
      access: '',
      image: '',
      asyncValidators: [imgType],
      imagePath: ''
    });
  }
  onImagePiked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateForm.patchValue({ image: file });
    this.updateForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
      console.log(this.imagePreview);
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssuesById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('author').setValue(this.issue.author);
        this.updateForm.get('category').setValue(this.issue.category);
        this.updateForm.get('heroes').setValue(this.issue.heroes);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('email').setValue(this.authService.user.email);
        this.updateForm.get('owner').setValue(this.issue.owner);
        this.updateForm.get('access').setValue(this.issue.access);
        this.updateForm.get('image').setValue(this.issue.image);
        this.updateForm.get('imagePath').setValue(this.issue.imagePath);
      });
    });
  }
  updateIssue(
    title,
    author,
    category,
    heroes,
    description,
    email,
    owner,
    access
  ) {
    // tslint:disable-next-line:max-line-length
    this.issueService
      .updateIssues(
        this.id,
        title,
        author,
        category,
        heroes,
        description,
        owner,
        email,
        access,
        this.updateForm.value.image
      )
      .subscribe(() => {
        this.snackBar.open('Book is update', 'ok', {
          duration: 5000
        });
      });
  }
  fetchIssues() {
    this.issueService
      .getIssues(this.bookPerPage, this.currentPage)
      .subscribe((data: Issue[]) => {
        this.issue = data;

        return this.issue;
      });
  }
  // login(formData: NgForm) {
  //   this.authService.login(formData.value.email, formData.value.password);
  // }
}
