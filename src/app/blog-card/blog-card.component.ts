import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
  @Input() blog: any;
  @Input() refreshBlogs: any;
  @ViewChild('blogRef') blogRef!: ElementRef;
  name = localStorage.getItem('name');
  onEditMode = false;

  constructor(private service: SharedService) {}

  deleteBlog(id: string) {
    this.service.deleteBlog(id).then((res) => this.refreshBlogs);
  }

  editBlog(id: string) {
    const blog = this.blogRef.nativeElement.value;
    this.service.editBlogs(id, blog);
  }

  checkIfOwned(name: string) {
    if (name === this.name) return true;
    return false;
  }
}
