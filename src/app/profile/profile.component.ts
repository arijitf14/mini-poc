import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res=> {
        this.userDetails = res['authData']
        console.log(this.userDetails)
      },
      err => {}
    )
  }

  onLogout() {
    this.userService.deleteToken()
    this.router.navigateByUrl('/login')
  }

}
