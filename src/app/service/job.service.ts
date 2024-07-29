import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobData: any;

  setJobData(data: any): void {
    this.jobData = data;
  }

  getJobData(): any {
    return this.jobData;
  }

  constructor() { }
}
