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
  investedFunds!: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private investmentService: InvestmentService,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    const userNickname = this.activatedRoute.snapshot.params['nickname']
    this.userDataService.getUserByNickname(userNickname).subscribe(data => {

      let updatedStocks: Stock[] = []
      let investedFunds = 0

      this.investmentService.navbarStatus.next(true)
      this.userDataService.currentUser.next(data!)
      this.currentUser = data

      for (let i = 0; i < data!.stocks?.length; i++) {
        let stock = {...data!.stocks[i], value: data!.stocks[i].amount! * data!.stocks[i].price}
        if (stock.amount !== 0) {
          updatedStocks.push(stock)
          investedFunds += stock.value
        }
      }
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
        userData: this.currentUser
      }
    })
    dialogRef.componentInstance.setCompleteCallback(() => this.getCurrentUser())
  }

}
