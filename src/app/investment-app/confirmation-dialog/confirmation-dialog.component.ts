import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/core/models/stock';
import { User } from 'src/app/core/models/user';
import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { UserDataService } from 'src/app/core/services/user-data/user-data.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  selectedStock!: Stock
  inputValue!: FormGroup
  userId!: string
  userNickname!: string
  currentUser?: User
  editedUser?: User

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Stock,
    private fb: FormBuilder,
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService
  ){}

  ngOnInit(): void {
    this.selectedStock = this.data
    this.inputValue = this.fb.group({
      inputValue: [0, Validators.min(0.1)]
    })
    this.userId = this.activatedRoute.snapshot.params['id']
    this.userNickname = this.activatedRoute.snapshot.params['nickname']
    this.userDataService.getUserByNickname(this.userNickname).subscribe(data => {this.currentUser = data
      console.log(data)}
    )
  }

  buyStock(): void {
    console.log(this.selectedStock.price * this.inputValue.value.inputValue)
    console.log(this.userId)
    console.log(this.userNickname)
    console.log(this.selectedStock)
    console.log(this.currentUser)

  }

}
