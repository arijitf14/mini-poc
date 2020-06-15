import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http' 

import { User } from './user.model'
import { Category } from './category.model'
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
     }

     category : Category = {
       name: '',
       description: '',
       img: '',
       isActive: true
     }

      categories : Category[] = []
        categoryUpdated = new Subject<Category[]>()
        image

  noAuthHeader = { headers: new HttpHeaders({'noAuth': 'true'})}

  constructor(private http: HttpClient) { }

  //Http Methods


  postUser(user: User): Observable<any>{
    // console.log(environment.apiBaseUrl)
     return this.http.post('http://localhost:3000/user/register',user,this.noAuthHeader)
  }

  login(authCredentials): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', authCredentials,this.noAuthHeader)
  }

  getUserProfile(){
    return this.http.get('http://localhost:3000/user/profile')
  }

//Helper Methods
  setToken(token: string){
    localStorage.setItem('token', token)
    console.log(token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  deleteToken(){
    localStorage.removeItem('token')
  }

  getPayload(){
    const token = this.getToken()
    if(token){
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload)
    }else{
      return null
    }
  }
  isLoggedIn() {
    var userPayload = this.getPayload()
    // console.log('userpay' + userPayload)
    // console.log('time' + userPayload.exp)
    if(userPayload){
      return userPayload.exp > Date.now() / 1000
    }else {
      return false
    }
 }

  getCategory() {
    if(this.isLoggedIn()){
     this.http
    .get<{categories: any}>('http://localhost:3000/user/getCat')
    .pipe(
      map((postData)=> {
        console.log(postData)
        return postData.categories.map((cat) => {
            return{
              id: cat._id,
              name: cat.name,
              isActive: cat.isActive,
              description: cat.description,
              img: cat.img
            }
        })
      })
    )
    .subscribe((transformedCat) => {
      this.categories = transformedCat
      this.categoryUpdated.next([...this.categories])
      console.log(transformedCat)
    })
  }
 }

 getCatUpdateListener() {
   return this.categoryUpdated.asObservable()
 }

postCategory(category: FormData): Observable<any> {
  return this.http.post('http://localhost:3000/user/catbulk',category,this.noAuthHeader)
  
}



}

