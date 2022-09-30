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
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }

  // Delete a user
  deleteUser(id: number | undefined): Observable<IUser> {
    return this.http.delete<IUser>(`http://localhost:3000/users/${id}`);
  }
}
