import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  currentDateTime: string = '';

  jobData: any;

  constructor(private jobService: JobService, private router: Router){}

  ngOnInit(): void {
    const now = new Date();

    // Format the date and time as needed
    this.currentDateTime = this.formatDateTime(now);
    this.jobData = this.jobService.getJobData();
    if(!this.jobData){
      console.log('No Job Data Found');
      
    }else{
      setTimeout(() => {
        window.print();
        this.router.navigate(['/user']);
      }, 500);
    }
    
  }

  invoiceGetJob(job: any): void {
    this.jobData = job;
    this.jobService.setJobData(job);
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1);
    const day = this.pad(date.getDate());
    const hours = this.pad(date.getHours());
    const minutes = this.pad(date.getMinutes());
    const seconds = this.pad(date.getSeconds());

    // Format: 'YYYY/MM/DD HH:MM:SS'
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

}
