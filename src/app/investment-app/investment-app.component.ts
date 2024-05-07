import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../core/services/routing/routing.service';

@Component({
  selector: 'app-investment-app',
  templateUrl: './investment-app.component.html',
  styleUrls: ['./investment-app.component.scss']
})
export class InvestmentAppComponent implements OnInit {

  constructor(
    private routingService: RoutingService
  ){}

  ngOnInit(): void {
  }

  createNewSimulation(): void {
    this.routingService.navigate('new-simulation')
  }

  loadSimulation(): void {
    this.routingService.navigate('load-simulation')
  }

}
