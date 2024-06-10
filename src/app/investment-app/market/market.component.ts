import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { Stock } from 'src/app/core/models/stock';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  selectedStock?: Stock
  public chart: any
  currentUser: User | undefined
  stocks = new MatTableDataSource<Stock>()
  columns = ['symbol', 'name', 'price', 'change', 'marketCap', 'volume', 'details']

  horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  constructor(
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getStocks()
    this.getCurrentUser()
  }

  createChart(): void{
    this.chart = new Chart("balanceChart", {
      type: 'line', 
      data: {
        labels: this.generateDates(), 
         datasets: [{
            label: "balance",
            data: [`${this.currentUser?.balance}`,'467','576', '572', '79', '92',
                 '574', '573', '576'],
            backgroundColor: 'blue'
        }]
      },
      options: {
        aspectRatio:4,
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }

  getCurrentUser(): void {
    const userNickname = this.activatedRoute.snapshot.params['nickname']
    this.userDataService.getUserByNickname(userNickname).subscribe((user: User | undefined) => {
      this.currentUser = user
      this.investmentService.navbarStatus.next(true)
      this.userDataService.currentUser.next(user!)
      this.createChart()
    })
  }

  generateDates(): string[] {
    let dates = []
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().slice(0, 7))
    }
    return dates.reverse()
  }

  getStocks(): void {
    this.investmentService.getStocks().subscribe({
      next: (stocks: Stock[]) => {
        this.stocks = new MatTableDataSource<Stock>(stocks)
        this.stocks.paginator = this.paginator
        this.stocks.sort = this.sort
      },
      error: () => {
        alert('Too many API requests. Come back later.')
      }
    })
  }

  filter(filterValue: Event) {
    let searchTerm = (filterValue.target as HTMLInputElement).value
    this.stocks.filter = searchTerm
  }

  gatherInfo(element: Stock): void {
    this.selectedStock = element
  }

  openDialog(data: Stock): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
    data: {
      stockData: data, 
      userData: this.currentUser
    },
    width: '520px',
    height: '320px'
    })

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result.boughtStockAmount === 1) {
        this.openSnackBar(`You just have bought ${result.boughtStockAmount} share of stock ${result.boughtStockName} `)
      } else {
        this.openSnackBar(`You just have bought ${result.boughtStockAmount} shares of stock ${result.boughtStockName} `)
      }
    })
  }

  openSnackBar(text: string): void {
    this._snackBar.open(text, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

}