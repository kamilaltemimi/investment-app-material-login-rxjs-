import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stock } from 'src/app/core/models/stock';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  selectedStock!: Stock
  inputValue!: FormGroup
  currentUser?: User

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private investmentService: InvestmentService,
    private readonly _dialog: MatDialogRef<ConfirmationDialogComponent>
  ){}

  ngOnInit(): void {
    this.selectedStock = this.data.stockData
    this.inputValue = this.fb.group({
      inputValue: [0, Validators.min(0.1)]
    })
    this.userDataService.getUserByNickname(this.data.userData.nickname).subscribe((user: User | undefined) => {this.currentUser = user})
  }

  buyStock(): void {

    const { balance, nickname, password, id, stocks, investedFunds, portfolioValue } = this.currentUser!
    const inputValue = this.inputValue.get('inputValue')?.value ?? 0
    const { price, name } = this.selectedStock
    const newInvestedFunds = investedFunds + (inputValue * price)
    const newUserBalance = balance - (inputValue * price)

    if (newUserBalance < 0) {
      alert('Not enough funds')
      return
    }

    const updatedStocks = stocks?.map((stock: Stock) => 
      stock.name === name ? {...stock, amount: stock.amount + inputValue, value: (stock.amount + inputValue) * price, priceWhenBought: price} : stock) || []

    if (!updatedStocks.some((stock: Stock) => stock.name === name)) {
      updatedStocks.push({...this.selectedStock, amount: inputValue, value: inputValue * price, boughtFor: price, valueWhenBought: inputValue * price})
    }

    const updatedUser = {
      id,
      nickname,
      password,
      balance: newUserBalance,
      investedFunds: newInvestedFunds,
      stocks: updatedStocks,
      portfolioValue: portfolioValue + (price * inputValue)
    }

    this.investmentService.addOrSellStock(id, updatedUser).subscribe()
  }

}