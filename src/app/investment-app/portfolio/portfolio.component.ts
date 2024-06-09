import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/core/models/stock';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';
import { SellStockDialogComponent } from '../sell-stock-dialog/sell-stock-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  currentUser?: User
  ownedStocks = new MatTableDataSource<Stock>([])
  columns = ['symbol', 'name', 'price', 'amount', 'value', 'change', 'sell']
  investedFunds = 0
  apiStocks!: Stock[]
  portfolioValue = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private investmentService: InvestmentService,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getCurrentUser()
    this.getStockExchangeInformation()
  }

  getCurrentUser(): void {
    const userNickname = this.activatedRoute.snapshot.params['nickname']
    
    this.userDataService.getUserByNickname(userNickname).subscribe(data => {
      console.log(data)
      let updatedStocks: Stock[] = []
      let investedFunds = 0

      this.investmentService.navbarStatus.next(true)
      this.userDataService.currentUser.next(data!)
      this.currentUser = data

      data?.stocks?.forEach((stockItem) => {
        let stock = {...stockItem, value: stockItem.amount! * stockItem.price}
        if (stock.amount !== 0) {
          updatedStocks.push(stock)
          investedFunds += stock.value
        }
      })

      this.ownedStocks.data = updatedStocks
      this.investedFunds = investedFunds
    })
  }

  openSellStockDialog(data: Stock): void {
    const dialogRef = this.matDialog.open(SellStockDialogComponent, {
      width: '400px',
      height: '335px',
      data: {
        stockData: data, 
        userData: this.currentUser,
        investedFunds: this.investedFunds,
        portfolioValue: this.portfolioValue
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.currentUser = result
      this.portfolioValue = result.portfolioValue
      this.investedFunds = result.investedFunds
      this.ownedStocks = result.stocks
      } 
    })
  }

  getStockExchangeInformation(): void {
    this.investmentService.getStocks().subscribe((data?: Stock[]) => {

      let portfolioValue = 0

      const updatedOwnedStocks = this.ownedStocks.data.map((ownedStock: Stock) => {
        const foundStock = data?.find((stock: Stock) => stock.symbol === ownedStock.symbol)
        if (foundStock) {
          const stockValue = ownedStock.amount! * foundStock.price!
          portfolioValue += stockValue
          return {...ownedStock, price: foundStock.price, value: stockValue, amount: ownedStock.amount}
        } 
        return ownedStock
      })
      
      this.portfolioValue = portfolioValue
      this.currentUser!.stocks = updatedOwnedStocks
      this.ownedStocks.data = updatedOwnedStocks

      this.investmentService.addOrSellStock(this.currentUser!.id, {...this.currentUser!, stocks: updatedOwnedStocks}).subscribe()
    })
  }

  refreshStocks(): void {
    this.getStockExchangeInformation()
  }

}