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
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
  columns = ["symbol", "name", "price", "change", "marketCap", "volume", "details"]

  constructor(
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getStocks()
    this.getCurrentUser()
  }

  createChart(){
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
        aspectRatio:2
      }
      
    });
  }

  getCurrentUser(): void {
    const userNickname = this.activatedRoute.snapshot.params['nickname']
    this.userDataService.getUserByNickname(userNickname).subscribe(data => {
      this.currentUser = data
      this.investmentService.navbarStatus.next(true)
      this.userDataService.currentUser.next(data!)
      this.createChart()
    })
  }

  generateDates(): string[] {
    let dates = []
    let today = new Date()
    for (let i = 0; i < 14; i++) {
      let date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().slice(0, 10))
    }
    return dates.reverse()
  }

  getStocks(): void {
    this.investmentService.getStocks().pipe(map(data => {
      let stocks = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].volume > 8000000 && data[i].marketCap !== 0) 
        stocks.push(data[i])
      } return stocks
    }
  )).subscribe(data => {
      this.stocks = new MatTableDataSource<Stock>(data)
      this.stocks.paginator = this.paginator
      this.stocks.sort = this.sort
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
    this.matDialog.open(ConfirmationDialogComponent, {
    data: data,
    width: '520px',
    height: '320px'
    })
  }

}
