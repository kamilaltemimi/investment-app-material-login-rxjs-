import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentAppRoutingModule } from './investment-app-routing.module';
import { InvestmentAppComponent } from './investment-app.component';


@NgModule({
  declarations: [
    InvestmentAppComponent
  ],
  imports: [
    CommonModule,
    InvestmentAppRoutingModule
  ]
})
export class InvestmentAppModule { }
