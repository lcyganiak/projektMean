import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class IssueService {
  uri = 'http://localhost:4000/issues';

  createForm: FormGroup;
  imagePreview: string;

  constructor(private http: HttpClient) {}
  getIssues(postPrePage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPrePage}&page=${currentPage}`;
    return this.http.get('http://localhost:4000/issues' + queryParams);
  }
  getLenght() {
    return this.http.get('http://localhost:4000/issues');
  }
  getIssuesById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }
  addIssues(
    title,
    author,
    category,
    heroes,
    description,
    owner,
    email,
    access,
    image: File,
    imagePath
  ) {
    const issue = new FormData();
    issue.append('title', title);
    issue.append('author', author);
    issue.append('category', category);
    issue.append('heroes', heroes);
    issue.append('description', description);
    issue.append('owner', owner);
    issue.append('email', email);
    issue.append('access', access);
    issue.append('image', image);
    issue.append('imagePath', imagePath);

    return this.http.post(`${this.uri}/add`, issue);
  }
  updateIssues(
    id,
    title,
    author,
    category,
    heroes,
    description,
    owner,
    email,
    access,
    image: File
    // imagePath
  ) {
    const issue = new FormData();
    issue.append('title', title);
    issue.append('author', author);
    issue.append('category', category);
    issue.append('heroes', heroes);
    issue.append('description', description);
    issue.append('owner', owner);
    issue.append('email', email);
    issue.append('access', access);
    issue.append('image', image);
    return this.http.post(`${this.uri}/update/${id}`, issue);

    // if (typeof image === 'object') {
    //   const issue = new FormData();
    //   issue.append('title', title);
    //   issue.append('author', author);
    //   issue.append('category', category);
    //   issue.append('heroes', heroes);
    //   issue.append('description', description);
    //   issue.append('owner', owner);
    //   issue.append('email', email);
    //   issue.append('access', access);
    //  issue.append('image', image);
    //     return this.http.post(`${this.uri}/update/${id}`, issue);
    // } else {
    //   const issue = new FormData();
    //   issue.append('title', title);
    //   issue.append('author', author);
    //   issue.append('category', category);
    //   issue.append('heroes', heroes);
    //   issue.append('description', description);
    //   issue.append('owner', owner);
    //   issue.append('email', email);
    //   issue.append('access', access);
    //   issue.append('image', image);
    //     return this.http.post(`${this.uri}/update/${id}`, issue);
    // }

    // const issue = new FormData();
    // issue.append('title', title);
    // issue.append('author', author);
    // issue.append('category', category);
    // issue.append('heroes', heroes);
    // issue.append('description', description);
    // issue.append('owner', owner);
    // issue.append('email', email);
    // issue.append('access', access);
    // issue.append('image', image);
    //   return this.http.post(`${this.uri}/update/${id}`, issue);
  }

  deleteIssues(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  onImagePiked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createForm.patchValue({ image: file });
    this.createForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }
}
