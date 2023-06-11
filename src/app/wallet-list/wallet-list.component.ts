import { Component } from '@angular/core';
import { ExpenseTrackerService } from '../services/expense-tracker.service';
import { data } from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent {

  walletObject = {
    name: '',
    balance: '',
    key: ''
  }

  finalList: any = []
  isEdit: boolean = false;

  constructor(private _expenseService: ExpenseTrackerService) { }

  createWallet() {
    this._expenseService.create(this.walletObject).then(() => {
      console.log("ADDED Wallet")
      Swal.fire('Wallet Added')
    })

    this.walletObject.name = '';
    this.walletObject.balance = '';
  }

  ngOnInit(): void {
    this.getAllWallet();
  }

  getAllWallet(): void {
    this._expenseService.getAll().snapshotChanges().subscribe((demo) => {
      this.finalList = demo.map((x: any) => ({ key: x.payload.key, ...x.payload.val() }))
      console.log("This Is The Wallet Data:", this.finalList)
    })
  }

  updateWallet(): void {
    let data = {
      name: this.walletObject.name,
      balance: this.walletObject.balance,
    };
    console.log("Data is Updated", this.walletObject)
    if (this.walletObject.key) {
      this._expenseService.update(this.walletObject.key, data)
      Swal.fire(`Wallet ${this.walletObject.name} Updated`)
      this.walletObject.name = '';
      this.walletObject.balance = '';
      this.isEdit = false;
    }
  }

  editWallet(data: any) {
    console.log("Edit Button Call", data)
    this.walletObject.name = data.name
    this.walletObject.balance = data.balance
    this.walletObject.key = data.key
    this.isEdit = true;
  }

  deleteWallet(key: any): void {
    this._expenseService.delete(key.key)
    Swal.fire('Wallet Deleted')
    console.log("Wallet is Deleted", key)
  }

}