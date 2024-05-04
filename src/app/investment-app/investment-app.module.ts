import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentAppRoutingModule } from './investment-app-routing.module';
import { InvestmentAppComponent } from './investment-app.component';
import { SharedModule } from '../shared/shared.module';
import { NewSimulationComponent } from './new-simulation/new-simulation.component';
import { LoadSimulationComponent } from './load-simulation/load-simulation.component';
import { MarketComponent } from './market/market.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CoreModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from '../core/services/user-data/user-data.service';
import { RoutingService } from '../core/services/routing/routing.service';
import { InvestmentService } from '../core/services/investment/investment.service';

@NgModule({
  declarations: [
    InvestmentAppComponent,
    NewSimulationComponent,
    LoadSimulationComponent,
    MarketComponent,
    MarketComponent,
    PortfolioComponent,
  ],
  imports: [
    CommonModule,
    InvestmentAppRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserDataService,
    RoutingService
  ]
})
export class InvestmentAppModule { }
