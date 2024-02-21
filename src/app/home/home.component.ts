import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { NgFor } from '@angular/common';
import { DocumentData } from '@angular/fire/firestore';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule, BlogCardComponent, MatIconModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  name = localStorage.getItem('name');

  constructor(private service: SharedService, private router: Router) {}

  blogs: any = [];

  refreshBlogs() {
    const res = this.service.getBlogs();
    let userList: (DocumentData | (DocumentData & { id: string }))[];
    let blogList: (DocumentData | (DocumentData & { id: string }))[];
    res[0].subscribe((response) => (userList = response));
    res[1].subscribe((response) => {
      blogList = response;
      for (const i in response) {
        userList.forEach((user) => {
          if (response[i]['users_id'].id === user.id)
            blogList[i]['users_id'] = user['name'];
        });
      }
      this.blogs = blogList;
    });
  }

  ngOnInit() {
    this.refreshBlogs();
  }

  onSubmit(nameForm: NgForm) {
    const blog = nameForm.value.blog;
    this.service.addBlogs(blog);
    this.refreshBlogs();
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
}
