import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private investmentService: InvestmentService
  ){}

  ngOnInit(): void {
    this.selectedStock = this.data.stockData
    this.inputValue = this.fb.group({
      inputValue: [0, Validators.min(0.1)]
    })
    this.userDataService.getUserByNickname(this.data.userData.nickname).subscribe(data => this.currentUser = data)
  }

  buyStock(): void {
    const userBalance = this.currentUser!.balance 
    const inputValue = this.inputValue.get('inputValue')?.value
    const stockPrice = this.selectedStock.price
    const stockName = this.selectedStock.name

    const userNickname = this.currentUser!.nickname
    const userPassword = this.currentUser!.password
    const userId = this.currentUser!.id
    const newUserBalance = userBalance - inputValue * stockPrice

    let stockFound = false
    let updatedStocks = this.currentUser?.stocks ? [...this.currentUser.stocks] : []

    if (newUserBalance < 0 ) {
      alert('not enough funds')
      return
    }

    if (updatedStocks) {
      for (let i = 0; i < updatedStocks.length; i++) {
        if (updatedStocks[i].name === stockName) {
          updatedStocks[i].amount += inputValue
          stockFound = true
          break
        }
      }
    }

    if (!stockFound) {
      updatedStocks.push({...this.selectedStock, amount: inputValue, value: inputValue * this.selectedStock.price})
    }

    this.investmentService.addOrSellStock(userId, {
      id: userId,
      nickname: userNickname,
      password: userPassword,
      balance: newUserBalance,
      stocks: updatedStocks
    }).subscribe()
  }

}