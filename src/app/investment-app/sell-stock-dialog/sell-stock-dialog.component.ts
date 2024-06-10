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
    const { balance, stocks, id } = this.currentUser
    const { price, boughtFor, name } = this.stockData
    const { investedFunds, portfolioValue } = this.data

    const newBalance = balance + this.selectedValue * price;
    const newInvestedFunds = investedFunds - this.selectedValue * boughtFor!
    const newPortfolioValue = portfolioValue - this.selectedValue * price
    const selectedValue = this.selectedValue

    const updatedStocks = stocks
      .map((stock: Stock) => stock.name === name ? {...stock, amount: stock.amount! - selectedValue, value: stock.value! - (selectedValue * price)} : stock)
      .filter((stock: Stock) => stock.amount !== 0)

      this.currentUser.stocks.map((stock: Stock) => {
      if (stock.name === this.stockData.name) {
        stock.amount! -= this.selectedValue
        stock.value! -= this.selectedValue * stock.price
      } return stock
    })

    const updatedUser = {
      ...this.currentUser,
      balance: newBalance,
      stocks: updatedStocks,
      investedFunds: newInvestedFunds,
      portfolioValue: newPortfolioValue,
      soldStockAmount: Number(selectedValue),
      soldStockName: name
    }

    this.investmentService.addOrSellStock(id, updatedUser).subscribe()
    
    this._dialog.close(updatedUser)
  }

}