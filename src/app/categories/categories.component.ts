import { Component, OnInit , Input } from '@angular/core';
import { Category } from '../shared/category.model'
import { Subscription } from 'rxjs'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { UserService } from '../shared/user.service'
import { CreateCatComponent } from '../create-cat/create-cat.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

categories: Category[] = []
catsub:Subscription

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getCategory()
    this.catsub = this.userService.getCatUpdateListener().subscribe(
      (categories: Category[]) => {
        this.categories = categories
      }
    )
  
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    this.dialog.open(CreateCatComponent,dialogConfig)
  }

}
