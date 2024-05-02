import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentAppComponent } from './investment-app.component';

const routes: Routes = [
  {path: '', component: InvestmentAppComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentAppRoutingModule { }
