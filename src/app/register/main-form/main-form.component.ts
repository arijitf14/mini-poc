import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [UserService]
})
export class MainFormComponent implements OnInit {
  showsuccessmessage : boolean
  serverError : string
  reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(public userService: UserService) { }

  ngOnInit(): void {  
  }
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showsuccessmessage = true
        setTimeout(() => this.showsuccessmessage = false, 4000)
        this.resetForm(form)
      },
      err => {
        if(err.status === 422) {
          this.serverError = err.console.error.join('<br/>');
          
        }else{
          this.serverError = 'Something went wrong. Contact the server'
        }
      }
    )
  }


  resetForm(form : NgForm){
    this.userService.selectedUser = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
    form.resetForm()
    this.serverError= ''
  }

}
