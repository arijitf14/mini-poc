import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';



import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  userDetails

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {
    this.userService.getUserProfile().subscribe(
      res=> {
        this.userDetails = res['authData']
        console.log(this.userDetails)
      },
      err => {}
    )
  }

  ngOnInit(): void {
    
  } 

}
