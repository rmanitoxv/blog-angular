import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  WithFieldValue,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private fs: Firestore,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  addUser(name: string) {
    const data = { name: name };
    const usersCollection = collection(this.fs, 'users');
    const res = collectionData(usersCollection, { idField: 'id' });
    localStorage.removeItem('id');
    getData(res, usersCollection, data, name, this.router);
  }

  getBlogs() {
    const blogsCollection = collection(this.fs, 'blogs');
    const usersCollection = collection(this.fs, 'users');
    const blogs = collectionData(blogsCollection, { idField: 'id' });
    const users = collectionData(usersCollection, { idField: 'id' });
    return [users, blogs];
  }

  addBlogs(blog: string) {
    const today = new Date();
    const dateString = this.datePipe.transform(today, 'MMMM d, y');
    const userRef = doc(this.fs, 'users/' + localStorage.getItem('id'));
    const data = {
      blog: blog,
      date: dateString,
      users_id: userRef,
    };
    const blogsCollection = collection(this.fs, 'blogs');
    return addDoc(blogsCollection, data);
  }

  editBlogs(id: string, blog: string) {
    const blogRef = doc(this.fs, 'blogs/' + id);
    const data = { blog: blog };
    return updateDoc(blogRef, data);
  }

  deleteBlog(id: string) {
    const blogRef = doc(this.fs, 'blogs/' + id);
    return deleteDoc(blogRef);
  }
}

const getData = (
  res: Observable<
    (
      | DocumentData
      | (DocumentData & {
          id: string;
        })
    )[]
  >,
  usersCollection: CollectionReference<DocumentData, DocumentData>,
  data: WithFieldValue<DocumentData>,
  name: string,
  router: Router
) => {
  res.subscribe((response) => {
    response.forEach((item) => {
      if (item['name'] === name) {
        localStorage.setItem('id', item.id);
        localStorage.setItem('name', item['name']);
        router.navigate(['/home']);
      }
    });
    if (!localStorage.getItem('id')) {
      addDoc(usersCollection, data);
      getData(res, usersCollection, data, name, router);
    }
  });
};
