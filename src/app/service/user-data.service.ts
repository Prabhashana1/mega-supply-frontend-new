import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userData: any;

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserData(): any {
    return this.userData;
  }

  constructor() { }
}
