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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'
import { SellStockDialogComponent } from './sell-stock-dialog/sell-stock-dialog.component';

@NgModule({ declarations: [
        InvestmentAppComponent,
        NewSimulationComponent,
        LoadSimulationComponent,
        MarketComponent,
        PortfolioComponent,
        ConfirmationDialogComponent,
        SellStockDialogComponent
    ], imports: [CommonModule,
        InvestmentAppRoutingModule,
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class InvestmentAppModule { }