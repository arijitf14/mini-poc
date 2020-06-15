import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model'
import { Subscription } from 'rxjs'

import { UserService } from '../shared/user.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categories: Category[] = []
catsub:Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCategory()
    this.catsub = this.userService.getCatUpdateListener().subscribe(
      (categories: Category[]) => {
        this.categories = categories
      }
    )
  }

}
