import { Component, OnInit, Input } from '@angular/core';
import { IssueService } from 'src/app/service/issue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { imgType } from './img-validatot';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  imagePreview: string;
  createForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      heroes: ['', Validators.required],
      description: ['', Validators.required],
      email: '',
      owner: ['', Validators.required],
      access: ['', Validators.required],
      image: '',
      asyncValidators: [imgType],
      imagePath: ''
    });
  }
  onImagePiked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createForm.patchValue({ image: file });
    this.createForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    //   console.log(file);
    //  console.log(this.createForm);
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  addIssue(
    title,
    author,
    category,
    heroes,
    description,
    email,
    owner,
    access,
    imagePath
  ) {
    this.issueService
      .addIssues(
        title,
        author,
        category,
        heroes,
        description,
        owner,
        email,
        access,
        this.createForm.value.image,
        this.createForm.value.imagePath
      )
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }

  ngOnInit() {}
}
