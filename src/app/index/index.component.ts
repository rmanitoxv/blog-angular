import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  constructor(private service: SharedService, private router: Router) {}
  onSubmit(nameForm: NgForm) {
    const uname = nameForm.value.name;
    this.service.addUser(uname);
  }
}
