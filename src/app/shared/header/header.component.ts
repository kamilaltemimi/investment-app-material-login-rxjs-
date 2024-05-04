import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { RoutingService } from 'src/app/core/services/routing/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarStatus!: boolean 

  constructor(
    private investmentService: InvestmentService,
    private routingService: RoutingService,
  ){}

  ngOnInit(): void {
    this.getNavbarStatus()
  }

  getNavbarStatus(): void {
    this.investmentService.navbarStatus.subscribe((data: boolean) => {this.navbarStatus = data
    })
  }

  goToHomepage(): void {
    this.routingService.navigate('')
    this.investmentService.setNavbarStatus(false)
  }


}
