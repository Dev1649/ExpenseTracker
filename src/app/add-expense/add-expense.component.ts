import { Component } from '@angular/core';
import { ExpenseTrackerService } from '../services/expense-tracker.service';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {

  expenseObject = {
    category: '',
    balance: '',
    date: '',
    note: '',
    walletKey: ''
  }

  expenseList: any = [];
  finalListcat: any = [];
  item: any;
  walletKey: any;

  constructor(private ExpenseService: ExpenseTrackerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryList();
    this.walletKey = this.route.snapshot.params['walletKey'];
    this.expenseObject.walletKey = this.walletKey
  }

  creatExpense(data: any) {
    this.ExpenseService.createExp(this.expenseObject).then(() => {
      console.log("ADDED Expense", this.expenseObject)
      Swal.fire("Expense Added")
      this.expenseObject.category = '';
      this.expenseObject.balance = '';
      this.expenseObject.date = '';
      this.expenseObject.note = '';
    })

  }

  updateExpense(): void {
    let data = {
      category: this.expenseObject.category,
      balance: this.expenseObject.balance,
      date: this.expenseObject.date,
      note: this.expenseObject.note
    };
    console.log("Data is Updated", this.expenseObject)
    if (this.expenseObject.walletKey) {
      this.ExpenseService.updateExp(this.expenseObject.walletKey, data);
      Swal.fire('Expense Updated')
    }
  }

  categoryList(): void {
    this.ExpenseService.getAllcat().snapshotChanges().subscribe((f) => {
      this.finalListcat = f.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
      console.log("Data For Dropdown:", this.finalListcat)
    })
  }

}
