import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  getUserData(): Observable<any> {
    return this.http.get(this.BASE_URL+'/admin/get-user');
  }

  addUserAccount(loginData:any): Observable<any> {
    return this.http.post(this.BASE_URL+'/admin/create-user-account', loginData);
  }

  addAdminAccount(loginData:any): Observable<any> {
    return this.http.post(this.BASE_URL+'/admin/create-admin-account', loginData);
  }

  deleteUser(userId: number): Observable<any>{
    return this.http.delete(this.BASE_URL+'/admin/delete-user/'+userId);
  }

  updateUser(updateData: any): Observable<any> {
    return this.http.put(this.BASE_URL+'/admin/update-user', updateData);
  }

  resetUserPassword(resetPasswordData: any): Observable<any> {
    return this.http.put(this.BASE_URL+'/admin/reset-password', resetPasswordData);
  }

}
