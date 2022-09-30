import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private http: HttpClient) { }

  // Subject to keep track and notify subscribers of the current user
  currentUserSubject: Subject<IUser | undefined> = new Subject<IUser | undefined>();
  userFoundSubject: Subject<boolean | undefined> = new Subject<boolean | undefined>();
  usersSubject: Subject<IUser[]> = new Subject<IUser[]>();
  userEditSubject: Subject<number | undefined> = new Subject<number | undefined>();

  // Login
  Login(username: string, password: string) {
    this.getUser(username, password).subscribe((user: IUser | undefined) => {
      if(user !== undefined) {
        this.userFoundSubject.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.currentUserSubject.next(user);
        this.userFoundSubject.next(false);
      }
    });
  }
  getUser(username: string, password: string): Observable<IUser | undefined> {
    return this.http.get<IUser[]>(`http://localhost:3000/users?username=${username}&password=${password}`)
    .pipe(
      map(user => {
        if (!user.length) {
          return undefined
        } else {
          return user[0];
        }
      })
    );
  }
  returnUser() {
    return this.currentUserSubject.asObservable();
  }
  returnUserFound() {
    return this.userFoundSubject.asObservable();
  }

  // Register
  Register(user: IUser): void {
    this.getUserByUsername(user.username).subscribe((maybeAUser: IUser | undefined) => {
      if(!maybeAUser) {
        this.http.post<IUser>('http://localhost:3000/users', user).subscribe(
          (postUser: IUser) => {
            this.Login(postUser.username, postUser.password);
          }
        );
      } else {
        alert('Username is taken!');
      }
    });
  }
  getUserByUsername(username: string): Observable<IUser | undefined> {
    return this.http.get<IUser[]>(`http://localhost:3000/users?username=${username}`)
    .pipe(
      map(user => {
        if (!user.length) {
          return undefined
        } else {
          return user[0];
        }
      })
    );
  }

  // Logout
  Logout(): void {
    this.userFoundSubject.next(undefined);
    this.currentUserSubject.next(undefined);
  }

  // Get all users
  getAllUsers(): void {
    this.http.get<IUser[]>('http://localhost:3000/users').subscribe((users: IUser[]) => {
      this.usersSubject.next(users);
    });
  }
  returnUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  // Delete a user
  deleteUser(id: number | undefined): void {
    this.http.delete<IUser>(`http://localhost:3000/users/${id}`).subscribe(() => {
      this.getAllUsers();
    });
  }

  // Edit a user
  startEditing(id: number | undefined): void {
    this.userEditSubject.next(id);
  }
  returnUserEdit(): Observable<number | undefined> {
    return this.userEditSubject.asObservable();
  }
  cancelEdit(): void {
    this.userEditSubject.next(undefined);
  }
  applyEdit(user: IUser): void {
    this.http.put<IUser>(`http://localhost:3000/users/${user.id}`, user).subscribe(() => {
      this.getAllUsers();
      this.userEditSubject.next(undefined);
    });
  }
}
