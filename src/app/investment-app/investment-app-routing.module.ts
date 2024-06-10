import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentAppComponent } from './investment-app.component';
import { NewSimulationComponent } from './new-simulation/new-simulation.component';
import { LoadSimulationComponent } from './load-simulation/load-simulation.component';
import { MarketComponent } from './market/market.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {path: '', component: InvestmentAppComponent},
  {path: 'new-simulation', component: NewSimulationComponent},
  {path: 'load-simulation', component: LoadSimulationComponent},
  {path: 'simulation/:id/:nickname/market', component: MarketComponent},
  {path: 'simulation/:id/:nickname/portfolio', component: PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentAppRoutingModule { }