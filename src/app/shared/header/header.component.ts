import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { RoutingService } from 'src/app/core/services/routing/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarStatus!: boolean 
  currentUser?: User

  constructor(
    private investmentService: InvestmentService,
    private routingService: RoutingService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getCurrentUser()
    this.getNavbarStatus()
  }

  getCurrentUser(): void {
    this.userDataService.currentUser.subscribe(user => this.currentUser = user)
  }

  getNavbarStatus(): void {
    this.investmentService.navbarStatus.subscribe(data => this.navbarStatus = data)
  }

  goToHomepage(): void {
    this.routingService.navigate('')
    this.investmentService.setNavbarStatus(false)
  }

  navigateToPortfolio(): void {
    this.routingService.navigate(`simulation/${this.currentUser?.id}/${this.currentUser?.nickname}/portfolio`)
  }

  navigateToMarket(): void {
    this.routingService.navigate(`simulation/${this.currentUser?.id}/${this.currentUser?.nickname}/market`)
  }

}
