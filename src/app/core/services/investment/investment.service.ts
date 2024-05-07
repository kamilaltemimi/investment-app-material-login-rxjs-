import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../../models/stock';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  URL = `https://financialmodelingprep.com/api/v3/symbol/NYSE?apikey=oEs60jHF1NMyiAiTXQTS4QatokiH2v78`

  navbarStatus = new BehaviorSubject<boolean>(false)

  setNavbarStatus(value: boolean): void {
    this.navbarStatus.next(value)
  }

  constructor(
    private http: HttpClient
  ) {}

  getStocks(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.URL)
  }


}


