import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stock } from 'src/app/core/models/stock';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';

@Component({
  selector: 'app-sell-stock-dialog',
  templateUrl: './sell-stock-dialog.component.html',
  styleUrls: ['./sell-stock-dialog.component.scss']
})
export class SellStockDialogComponent implements OnInit {

  stockData!: Stock
  stockAmount!: number[]
  selectedValue!: number
  currentUser!: User

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private investmentService: InvestmentService,
    private readonly _dialog: MatDialogRef<SellStockDialogComponent>
  ) {}

  ngOnInit(): void {
    this.currentUser = this.data.userData
    this.stockData = this.data.stockData
    let amount = []
    for (let i = 1; i <= this.data.stockData.amount!; i++) {
      amount.push(i)
      this.stockAmount = amount
    }
  }

  sellStock(): void {
    let newBalance = this.currentUser.balance + (this.selectedValue * this.stockData.price)
    let investedFunds = this.data.investedFunds - (this.stockData.boughtFor! * this.selectedValue)
    let newPortfolioValue = this.data.portfolioValue - (this.selectedValue * this.stockData.price)
    console.log(this.currentUser)
    const updatedStocks = this.currentUser.stocks.map(stock => {
      if (stock.name === this.stockData.name) {
        stock.amount! -= this.selectedValue
        stock.value! -= this.selectedValue * stock.price
      } return stock
    })

    for (let i = 0; i < updatedStocks.length; i++) {
      if (updatedStocks[i].amount === 0) {
        updatedStocks.splice(i, 1)
      }
    }

    const updatedUser = {
      id: this.currentUser.id,
      nickname: this.currentUser.nickname,
      password: this.currentUser.password,
      balance: newBalance,
      stocks: updatedStocks,
      investedFunds: investedFunds,
      portfolioValue: newPortfolioValue
    }
    this.investmentService.addOrSellStock(this.currentUser.id, updatedUser).subscribe()
    this._dialog.close(updatedUser)
  }

}