import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';
import { SummaryAndBalancesComponent } from './summary-and-balances/summary-and-balances.component';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

const routes: Routes = [
  {path: '', component: ExpenseTrackerComponent},
  {path: 'wallets', component: WalletListComponent},
  {path: 'categories', component: CategoriesListComponent},
  {path: 'add-expense/:walletKey', component: AddExpenseComponent},
  {path: 'edit-expense/:walletKey/:expenseKey', component: AddExpenseComponent},
  {path: 'expensies/:walletKey', component: SummaryAndBalancesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
