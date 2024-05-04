import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  navbarStatus = new BehaviorSubject<boolean>(false)

  setNavbarStatus(value: boolean): void {
    this.navbarStatus.next(value)
  }

  constructor(
  ) {}

}
