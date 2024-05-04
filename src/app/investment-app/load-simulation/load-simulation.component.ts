import { UserDataService } from 'src/app/core/services/user-data/user-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { RoutingService } from 'src/app/core/services/routing/routing.service';

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
    private routingService: RoutingService
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
    this.userDataService.getUsers().subscribe(data => this.users = data)
  }

  submitForm(): void {
    for (let user of this.users) {
      if (user.nickname === this.loginForm.value.nickname && user.password === this.loginForm.value.password) {
        this.routingService.navigate(`simulation/${user.nickname}/portfolio`)
      } else if (user.nickname !== this.loginForm.value.nickname || user.password !== this.loginForm.value.password) {
        this.alert = true
        setInterval(() => this.alert = false, 5000)
      }
    }
  }

}
