import { RoutingService } from './../../core/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';

@Component({
  selector: 'app-new-simulation',
  templateUrl: './new-simulation.component.html',
  styleUrls: ['./new-simulation.component.scss']
})
export class NewSimulationComponent implements OnInit {

  createAccountForm!: FormGroup
  existingUsers?: User[]
  takenNickname = false

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private routingService: RoutingService,
    private investmentService: InvestmentService
  ){}

  ngOnInit(): void {
    this.initializeForm()
    this.getExistingUsers()
  }

  initializeForm(): void {
    this.createAccountForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  getExistingUsers(): void {
    this.userDataService.getUsers().subscribe(data => this.existingUsers = data)
  }

  submitForm(): void {
    if (this.existingUsers) {
      for (let user of this.existingUsers) {
        if (user.nickname === this.createAccountForm.value.nickname) {
          this.takenNickname = true
          setInterval(() => this.takenNickname = false, 5000)
          return
        } 
      }
    }
    this.userDataService.createUser(this.createAccountForm.value)
      .subscribe(() => this.userDataService.getUserByNickname(this.createAccountForm.value.nickname)
      .subscribe(data => this.navigateToPortfolio(data!.nickname)))

    this.investmentService.setNavbarStatus(true)
  }

  navigateToPortfolio(nickname: string){
    this.routingService.navigate(`simulation/${nickname}/portfolio`)
  }
}
