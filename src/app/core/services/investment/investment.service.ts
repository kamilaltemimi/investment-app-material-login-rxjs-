import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
    return this.http.get<Stock[]>(this.apiURL).pipe(map((data: Stock[]) => {
      let stocks = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].volume > 8000 && data[i].marketCap !== 0 && data[i].price < 5000) 
        stocks.push(data[i])
      } return stocks
    }))
  }

  addOrSellStock(userId: string, newUserData: User): Observable<User> {
    return this.http.put<User>(this.investmentURL + `/${userId}.json`, newUserData)
  }

}