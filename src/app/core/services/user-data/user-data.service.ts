import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  URL = 'https://investment-app-d5d6e-default-rtdb.firebaseio.com/users.json'

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: string): Observable<User> {
    return this.http.post<User>(this.URL, user)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<{[key: string]: User}>(this.URL).pipe(map(data => {
      let users: User[] = []
      for (const key in data) {
        users.push({...data[key], id: key})
      } return users
    }))
  }

  getUserByNickname(nickname: string): Observable<User | undefined> {
    return this.http.get<{[key:string]: User}>(this.URL).pipe(map(data => {
      let user
      for (const key in data) {
        if (data[key].nickname === nickname) {
          user = {...data[key], id: key}
        } 
      } return user
    }))
  }

}
