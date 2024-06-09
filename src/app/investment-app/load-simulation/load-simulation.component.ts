import { UserDataService } from 'src/app/core/services/user-data/user-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { RoutingService } from 'src/app/core/services/routing/routing.service';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';

@Component({
  selector: 'app-load-simulation',
  templateUrl: './load-simulation.component.html',
  styleUrls: ['./load-simulation.component.scss']
})
export class LoadSimulationComponent implements OnInit{

  loginForm!: FormGroup
  users: User[] = []
  alert = false

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private routingService: RoutingService,
    private investmentService: InvestmentService
  ){}

  ngOnInit(): void {
    this.initializeForm()
    this.getUsers()
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  getUsers(): void {
    this.userDataService.getUsers().subscribe((users: User[]) => this.users = users)
  }

  submitForm(): void {
    let userFound = false
    for (let user of this.users) {
      if (user.nickname === this.loginForm.value.nickname && user.password === this.loginForm.value.password) {
        this.userDataService.getUserByNickname(this.loginForm.value.nickname)
        .subscribe((user: User | undefined) => {
          this.setCurrentUser(user!)
          this.navigateToPortfolio(user!.id, user!.nickname)
          this.setNavbarStatus(true)
        })
        userFound = true
        return
      } 
    }
    if (!userFound) {
      this.alert = true
      setTimeout(() => this.alert = false, 5000)
    }
  }

  setNavbarStatus(value: boolean): void {
    this.investmentService.setNavbarStatus(value)
  }
  
  setCurrentUser(user: User): void {
    this.userDataService.setCurrentUser(user)
  }

  navigateToPortfolio(id: string, nickname: string): void {
    this.routingService.navigate(`simulation//${id}/${nickname}/portfolio`)
  }

}