import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }


  public setRole(role: string){
    localStorage.setItem('role', (role));
  }

  public getRole(): string{
    return <string>localStorage.getItem('role');
  }

  public setToken(token: string){
    localStorage.setItem('jwtToken', token);
  }

  public isAdmin(): boolean{
    return this.getRole() === 'ADMIN';
  }

  public getToken(): string{
    return <string>localStorage.getItem('jwtToken');
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRole() && this.getToken();
  }


}
