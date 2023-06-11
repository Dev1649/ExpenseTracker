import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { SummaryAndBalancesComponent } from './summary-and-balances/summary-and-balances.component';
import { FormsModule } from '@angular/forms';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseTrackerComponent,
    SidebarComponent,
    WalletListComponent,
    CategoriesListComponent,
    SummaryAndBalancesComponent,
    AddExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
