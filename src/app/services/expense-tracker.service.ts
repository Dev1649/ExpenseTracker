import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})


export class ExpenseTrackerService {
  private dbPath = '/wallet';
  private databpath = '/category';
  private dbasepath = '/expensedata';
  walletRef: AngularFireList<any>;
  dbListRef: AngularFireList<any>;
  expensedb: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.walletRef = this.db.list('wallet');
    this.dbListRef = this.db.list('category');
    this.expensedb = this.db.list('expensedata');
  }

  create(wallet: any): any {
    delete wallet.key
    return this.walletRef.push({ ...wallet });
  }

  getAll(): AngularFireList<any> {
    return this.walletRef;
  }

  update(name: any, balance: any): Promise<void> {
    return this.walletRef.update(name, balance);
  }

  delete(key: any): Promise<void> {
    return this.walletRef.remove(key);
  }




  createcat(category: any): any {
    delete category.key
    return this.dbListRef.push({ ...category });
  }

  getAllcat(): AngularFireList<any> {
    return this.dbListRef;
  }

  updatecat(name: any, balance: any): Promise<void> {
    return this.dbListRef.update(name, balance);
  }

  deletecat(key: any): Promise<void> {
    return this.dbListRef.remove(key);
  }




  createExp(expensedata: any): any {
    // delete expensedata.key
    return this.expensedb.push({ ...expensedata });
  }

  updateExp(key: any, data: any): Promise<void> {
    return this.expensedb.update(key, data);
  }




  getAllExp(): AngularFireList<any> {
    return this.expensedb;
  }

  deleteExp(key: any): Promise<void> {
    return this.expensedb.remove(key);
  }

}