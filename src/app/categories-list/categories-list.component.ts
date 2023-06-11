import { Component } from '@angular/core';
import { ExpenseTrackerService } from '../services/expense-tracker.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {

  categoryObject = {
    category: '',
    key: ''
  }

  finalListcat: any = [];
  isEdit: boolean = false;

  constructor(private ExpenseService: ExpenseTrackerService) { }

  createCategory() {
    this.ExpenseService.createcat(this.categoryObject).then(() => {
      console.log("ADDED")
      Swal.fire('Category Added')
    })

    this.categoryObject.category = '';
  }

  ngOnInit(): void {
    this.getAllcategory();
  }

  getAllcategory(): void {
    this.ExpenseService.getAllcat().snapshotChanges().subscribe((cat: any) => {
      this.finalListcat = cat.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
      console.log("This Is The Category Data:", this.finalListcat)
    })
  }

  updatecategory(): void {
    let data = {
      category: this.categoryObject.category
    };
    console.log("Data is Updated", this.categoryObject)
    if (this.categoryObject.key) {
      this.ExpenseService.updatecat(this.categoryObject.key, data)
      this.categoryObject.category = '';
      this.isEdit = false
      Swal.fire('Category Updated')
    }
  }

  editcategory(data: any) {
    console.log("Edit Button Call", data)
    this.isEdit = true
    this.categoryObject.category = data.category
    this.categoryObject.key = data.key
  }

  deletecategory(key: any): void {
    this.ExpenseService.deletecat(key.key)
    console.log("Category is Deleted", key)
    Swal.fire('Category Deleted')
  }

}