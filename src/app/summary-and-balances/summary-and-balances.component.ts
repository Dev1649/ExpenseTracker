import { Component } from '@angular/core';
import { ExpenseTrackerService } from '../services/expense-tracker.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summary-and-balances',
  templateUrl: './summary-and-balances.component.html',
  styleUrls: ['./summary-and-balances.component.css']
})
export class SummaryAndBalancesComponent {


  expenseList: any = [];
  finalList: any = [];
  data: any;
  walletObject: any;
  expenseObject: any;
  walletKey: any;
  balanceRemain: any;

  constructor(private ExpenseService: ExpenseTrackerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllExpenseList();
    this.walletName();
    this.walletKey = this.route.snapshot.params['walletKey'];
    console.log("Wallet Key:", this.walletKey);
  }

  getAllExpenseList(): void {
    this.ExpenseService.getAllExp().snapshotChanges().subscribe((exp: any) => {
      const tempResponse = exp.map((e: any) => ({ key: e.payload.key, ...e.payload.val() }))
      this.expenseList = []
      this.ExpenseService.getAllcat().snapshotChanges().subscribe((f) => {
        const categories = f.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))

        // All Expenses
        tempResponse.forEach((element: any) => {
          // Single Expense = element
          if (element.walletKey === this.walletKey) {
            // All Categories
            categories.forEach((category: any) => {
              // Single Category = category
              if (element.category == category.key) {
                // Same Category id compre and name replace with id in single matched with current walletkey  
                element.category = category.category
              }
            })

            this.remainingBalance(this.finalList.balance, element.balance)

            this.expenseList.push(element)
          }
        });
      })
      console.log("This is Expense Data:", this.expenseList)
    })
  }

  deleteExpense(key: any): void {
    this.ExpenseService.deleteExp(key.key).then(() => {
      console.log("Expense List is Deleted", key)
      Swal.fire('Category Deleted')
    })
  }

  walletName(): void {
    this.ExpenseService.getAll().snapshotChanges().subscribe((d) => {
      const tempResponse = d.map((o: any) => ({ key: o.payload.key, ...o.payload.val() }))
      tempResponse.forEach((element: any) => {
        if (element.key === this.walletKey) this.finalList = element
      });
      // console.log("Data For Dropdown:", this.finalList)
    })
  }

  remainingBalance(totalBalance: any, expenseCost: any) {

    console.log("Balance Current:", totalBalance, typeof totalBalance);
    console.log("Balance Current:", expenseCost, typeof expenseCost);

    this.finalList['balance'] = totalBalance - expenseCost;
    console.log("Balance Remain:", this.finalList.balance);
    console.log()
  }

}
