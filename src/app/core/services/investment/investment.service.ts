import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../../models/stock';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  apiURL = `https://financialmodelingprep.com/api/v3/symbol/NYSE?apikey=oEs60jHF1NMyiAiTXQTS4QatokiH2v78`
  investmentURL = 'https://investment-app-d5d6e-default-rtdb.firebaseio.com/users'

  navbarStatus = new BehaviorSubject<boolean>(false)

  setNavbarStatus(value: boolean): void {
    this.navbarStatus.next(value)
  }

  constructor(
    private http: HttpClient
  ) {}

  getStocks(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.apiURL)
  }

  addOrSellStock(userId: string, newUserData: User): Observable<User> {
    return this.http.put<User>(this.investmentURL + `/${userId}.json`, newUserData)
  }

}


