import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private BASE_URL = 'http://178.128.116.193:8080/api';
 private BASE_URL = 'https://megaback-production.up.railway.app/api'
  //private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  requstHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );


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

  getJobData(page: number, size: number): Observable<any>{
    return this.http.get(this.BASE_URL+'/employee/get-all-job', {params: {page: page.toString(), size: size.toString()}});
  }

  deleteJob(jobId: number): Observable<any>{
    return this.http.delete(this.BASE_URL+'/admin/delete-job/'+jobId);
  }

  addJob(jobData:any): Observable<any> {
    return this.http.post(this.BASE_URL+'/employee/save-job', jobData);
  }

  jobRepair(jobRepairData: any): Observable<any> {
    return this.http.put(this.BASE_URL+'/employee/job-repair', jobRepairData);
  }

  updateJob(updateJobData: any): Observable<any> {
    return this.http.put(this.BASE_URL+'/employee/update', updateJobData);
  }

  payJob(payJobData: any): Observable<any> {
    return this.http.put(this.BASE_URL+'/employee/pay', payJobData);
  }

  searchJobById(id: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search/${id}`);
  }

  searchOneJobById(id: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-id/${id}`);
  }

  searchJobByCustomerName(customerName: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-name/${customerName}`);
  }

  searchJobByPhoneNumber(phoneNumber: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-phone-number/${phoneNumber}`);
  }

  searchJobByPhoneModel(phoneModel: string, page: number, size: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-phone-model/${phoneModel}`, {params: {page: page.toString(), size: size.toString()}});
  }

  searchJobByImei(imei: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-imei/${imei}`);
  }

  filterByStatus(status: string, page: number, size: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/filter-by-status/${status}`, {params: {page: page.toString(), size: size.toString()}});
  }

  filterByDate(date: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/search-by-date/${date}`);
  }

  contactUs(contactUs:any): Observable<any> {
    return this.http.post(this.BASE_URL+'/auth/contact-us', contactUs, {headers: this.requstHeader});
  }

  createViewLink(jobId: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/employee/create-view-link/${jobId}`);
  }

  viewCreatedLink(token: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/auth/view-generated-token/${token}`, {headers: this.requstHeader});
  }

  getSalesByYear(year: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/admin/get-sales-by-year/${year}`);
  }

  getDailySalesByMonth(year: number, month: number): Observable<any>{
    return this.http.get(this.BASE_URL+`/admin/jobs/daily-sales?year=${year}&month=${month}`);
  }

}
