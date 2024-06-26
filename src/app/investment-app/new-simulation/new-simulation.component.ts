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
      password: ['', [Validators.required, Validators.maxLength(20)]],
      balance: [10000],
      investedFunds: [0],
      portfolioValue: [0]
    })
  }

  getExistingUsers(): void {
    this.userDataService.getUsers().subscribe((data: User[]) => this.existingUsers = data)
  }

  submitForm(): void {
    let existingUser = false
    if (this.existingUsers) {
      this.existingUsers.forEach(((user: User) => {
        if (user.nickname === this.createAccountForm.value.nickname) {
          this.takenNickname = true
          existingUser = true
          return
        } 
      }))
    }

    if (!existingUser) {
      this.userDataService.createUser(this.createAccountForm.value)
      .subscribe(() => this.userDataService.getUserByNickname(this.createAccountForm.value.nickname)
      .subscribe((user: User | undefined ) => {
        this.setCurrentUser(user!)
        this.navigateToPortfolio(user!.id, user!.nickname)
        this.setNavbarStatus(true)
      }))
    }
  }

  setNavbarStatus(value: boolean): void {
    this.investmentService.setNavbarStatus(value)
  }
  
  setCurrentUser(user: User): void {
    this.userDataService.setCurrentUser(user)
  }

  navigateToPortfolio(id: string, nickname: string): void {
    this.routingService.navigate(`simulation/${id}/${nickname}/portfolio`)
  }

}