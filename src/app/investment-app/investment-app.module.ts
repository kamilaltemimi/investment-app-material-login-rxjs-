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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'
@NgModule({
  declarations: [
    InvestmentAppComponent,
    NewSimulationComponent,
    LoadSimulationComponent,
    MarketComponent,
    MarketComponent,
    PortfolioComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    InvestmentAppRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
  ]
})
export class InvestmentAppModule { }
