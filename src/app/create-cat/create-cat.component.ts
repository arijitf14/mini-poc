import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { UserService } from '../shared/user.service'
import { NgForm } from '@angular/forms'



@Component({
  selector: 'app-create-cat',
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.scss']
})
export class CreateCatComponent implements OnInit {
  altimg: string = "../../assets/images/imagelogo.png"
  images : File = null
  showsuccessmessage : boolean
  serverError : string

  constructor(private http: HttpClient ,public userService: UserService) { }

  ngOnInit(): void {
  }

  selectedImage(file: FileList){

    this.images = file.item(0)

    //Show image preview
    var reader = new FileReader()
    reader.onload = (event: any) => {
      this.altimg = event.target.result 
    }
    
    reader.readAsDataURL(this.images)
    // if(event.target.files.length>0){
    //   const file = event.target.files[0]
    //   this.images= file
      // for (var i= 0; i< File.length ; i++ ){
      //   var reader = new FileReader()

      //   reader.readAsDataURL(event.target.files[i])

      //   reader.onload = (event:any) => {
      //     this.urls.push(event.target.result)
      //   }
      // }
    }
  

  // onSubmit() {
  //   const formData = new FormData()
  //   for( var k = 0 ; k< this.urls.length; k++){
  //   formData.append('file' , this.urls[k])
  //   }
 
  //   this.userService.postCategory(formData)
    
  // }

  onSubmit(form) {
    const formData = new FormData(form)
    formData.append('file' , this.images)
    this.userService.postCategory(form.value).subscribe(
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
    this.userService.category = {
      name: '',
      description: '',
      img: '',
      isActive: true
    }
    form.resetForm()
    this.serverError= ''
  }
}
