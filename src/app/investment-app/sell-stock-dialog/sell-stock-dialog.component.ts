import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/core/models/stock';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';

@Component({
  selector: 'app-sell-stock-dialog',
  templateUrl: './sell-stock-dialog.component.html',
  styleUrls: ['./sell-stock-dialog.component.scss']
})
export class SellStockDialogComponent implements OnInit {

  stockData!: Stock
  stockAmount!: number[]
  selectedValue!: number
  currentBalance!: number
  currentUser!: User

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private investmentService: InvestmentService,
    private userDataService: UserDataService
  ) {}


  ngOnInit(): void {
    this.currentUser = this.data.userData
    this.stockData = this.data.stockData
    let amount = []
    for (let i = 0; i <= this.data.stockData.amount!; i++) {
      amount.push(i)
      this.stockAmount = amount
    }
  }

  completeCallback!: () => void;

  setCompleteCallback(callback: () => void): void {
    this.completeCallback = callback;
  }

  sellStock(): void {
    let newBalance = this.currentUser.balance += this.selectedValue * this.stockData.price

    const updatedStocks = this.currentUser.stocks.map(stock => {
      if (stock.name === this.stockData.name) {
        stock.amount! -= this.selectedValue
        stock.value! -= this.selectedValue * stock.price
      } return stock
    })

    this.investmentService.addOrSellStock(this.currentUser.nickname, {
      id: this.currentUser.id,
      nickname: this.currentUser.nickname,
      password: this.currentUser.password,
      balance: newBalance,
      stocks: updatedStocks
    }).subscribe(() => this.completeCallback())
  }

}
