import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


 //BASE_URL = 'http://178.128.116.193:8080/api/auth';
  BASE_URL = "https://megaback-production.up.railway.app/api/auth";
  //BASE_URL = "http://localhost:8080/api/auth";

  constructor(private httpClient:HttpClient , private userAuthService:UserAuthService) { }

  requstHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  public login(loginData:any){
    return this.httpClient.post(this.BASE_URL+"/login", loginData, {headers:this.requstHeader});
  }


  public roleEqual(allowRoles: string): boolean{
    let isMatch = false;
    const userRole: string = this.userAuthService.getRole();

    if(userRole != null && userRole){
      if(userRole === allowRoles){
        isMatch = true;
        return isMatch;
      }else{
        return isMatch;
      }
    }else{
      return isMatch;
    }
  }


}
