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
    let existingUser = false
    if (this.existingUsers) {
      for (let user of this.existingUsers) {
        if (user.nickname === this.createAccountForm.value.nickname) {
          this.takenNickname = true
          setTimeout(() => this.takenNickname = false, 5000)
          existingUser = true
          return
        } 
      }
    }
    if (!existingUser) {
      this.userDataService.createUser(this.createAccountForm.value)
      .subscribe(() => this.userDataService.getUserByNickname(this.createAccountForm.value.nickname)
      .subscribe(data => {
        this.setCurrentUser(data!)
        this.navigateToPortfolio(data!.id!, data!.nickname)
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
