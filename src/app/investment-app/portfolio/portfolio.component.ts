import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  currentUser?: User | null

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private investmentService: InvestmentService
  ){}

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    const userNickname = this.activatedRoute.snapshot.params['nickname']
    this.userDataService.getUserByNickname(userNickname).subscribe(data => {
      this.currentUser = data
      this.investmentService.navbarStatus.next(true)
      this.userDataService.currentUser.next(data!)
    })
  }


}
