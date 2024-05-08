import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/core/models/stock';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  selectedStock!: Stock
  inputValue!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Stock,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.selectedStock = this.data
    this.inputValue = this.fb.group({
      inputValue: ['', Validators.min(0)]
    })
  }

  buyStock(): void {
    console.log(this.data)
  }

}
