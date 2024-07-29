import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobPayForm } from 'src/app/model/JobPay';
import { JobRepairForm } from 'src/app/model/JobRepair';
import { JobSaveForm } from 'src/app/model/JobSave';
import { JobUpdateForm } from 'src/app/model/JobUpdate';
import { ApiService } from 'src/app/service/api.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { PaymentComponent } from '../payment/payment.component';
import { JsonPipe } from '@angular/common';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  jobData: any[] = [];
  errorMessage: string = '';
  showError: boolean = false;
  isAdmin: boolean = false;
  showSuccessResponse: boolean = false;
  showFailedResponse: boolean = false;
  message: string = '';
  searchJobId: number | null = null;
  searchCustomerName: string = '';
  searchPhoneNumber: string = '';
  searchPhoneModel: string = '';
  searchImei: string = '';
  searchOption: string = 'Select Search Option';
  searchReceivedDate: string = '';
  filterOption: string = 'PENDING';
  totalJobs: number = 0;
  currentPage: number = 0;
  pageSize: number = 50;
  totalJobsForModel: number = 0;
  currentPageForModel: number = 0;
  pageSizeForModel: number = 50;
  totalJobsForStatus: number = 0;
  currentPageForStatus: number = 0;
  pageSizeForStatus: number = 50;
  Math = Math;
  oneJob: any;


  saveFormData: JobSaveForm = {
    customerName: '',
    phoneNumber: '',
    phoneModel: '',
    imei: '',
    fault: '',
    price: 0,
    description: '',
    hasBackCover: false,
    hasMemoryCard: false,
    hasSimCard: false,
    status: 'PENDING'
  }

  jobUpdateFormData: JobUpdateForm = {
    id: 0,
    customerName: '',
    phoneNumber: '',
    phoneModel: '',
    imei: '',
    fault: '',
    price: 0,
    description: '',
    hasBackCover: false,
    hasMemoryCard: false,
    hasSimCard: false,
    status: ''
  }

  jobPayFormData: JobPayForm = {
    id: 0,
    price: 0
  }

  jobRepairForm: JobRepairForm = {
    id: 0,
    status: ''
  }

  openJobRepairModal(job: any): void {
    this.jobRepairForm = { ...job };
  }

  openJobUpdateModal(job: any): void {
    this.jobUpdateFormData = { ...job };

  }

  openJobPayModal(job: any): void {
    this.jobPayFormData = { ...job };
  }


  constructor(private apiService: ApiService, private userAuthService: UserAuthService, private router: Router, private jobService: JobService) { }


  ngOnInit(): void {
    this.getJobData();
  }

  searchById(id: number | null) {
    if (id === null) {
      this.getJobData();
      return
    }
    this.apiService.searchJobById(id).subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }

  searchByCustomerName(name: string) {
    if (name === '') {
      this.getJobData();
      return
    }
    this.apiService.searchJobByCustomerName(name).subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }

  searchByPhoneNumber(phoneNumber: string) {
    if (phoneNumber === '') {
      this.getJobData();
      return
    }
    this.apiService.searchJobByPhoneNumber(phoneNumber).subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }

  searchByPhoneModel(phoneModel: string, page: number = 0) {
    if (phoneModel === '') {
      this.getJobData();
      return
    }
    this.apiService.searchJobByPhoneModel(phoneModel, page, this.pageSizeForModel).subscribe({
      next: (response) => {
        this.jobData = response.data.jobList;
        this.totalJobsForModel = response.data.jobCount;
        this.currentPageForModel = page;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }

  searchByImei(imei: string) {
    if (imei === '') {
      this.getJobData();
      return
    }
    this.apiService.searchJobByImei(imei).subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }

  filterByDate(date: string) {
    if (date === '') {
      this.getJobData();
      return
    }
    this.apiService.filterByDate(date).subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
        this.getJobData();
      }
    });
  }


  filterByStatus(status: string, page: number = 0) {
    if (status === '') {
      this.getJobData();
      return
    }
    this.apiService.filterByStatus(status, page, this.pageSizeForStatus).subscribe({
      next: (response) => {
        this.jobData = response.data.jobList;
        this.totalJobsForStatus = response.data.jobCount;
        this.currentPageForStatus = page;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert(error);
      }
    });
  }


  getJobData(page: number = 0) {
    this.apiService.getJobData(page, this.pageSize).subscribe({
      next: (response) => {
        this.jobData = response.data.jobList;
        this.totalJobs = response.data.jobCount;
        this.currentPage = page;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.showFailedAlert('Failed to fetch job data. Please try again later. ' + error);
      }
    });
  }

  onPageChange(page: number): void {
    this.getJobData(page);
  }

  onPageChangeForModel(page: number): void {
    this.searchByPhoneModel(this.searchPhoneModel, page);
  }

  onPageChangeForStatus(page: number): void {
    this.filterByStatus(this.filterOption, page);
  }


  addJob(jobSaveForm: NgForm) {
    if (jobSaveForm.valid) {
      this.apiService.addJob(jobSaveForm.value).subscribe((response: any) => {
        this.showSuccessAlert(response.message);
        this.getJobData();
        this.resetJobSaveForm(jobSaveForm);

      },
        (error => {
          this.showFailedAlert(error);
          jobSaveForm.resetForm();
        })
      );
    }
  }

  resetJobSaveForm(jobSaveForm: NgForm): void {
    jobSaveForm.resetForm();
    jobSaveForm.setValue({
      customerName: '',
      phoneNumber: '',
      phoneModel: '',
      imei: '',
      fault: '',
      price: 0,
      description: '',
      hasBackCover: false,
      hasMemoryCard: false,
      hasSimCard: false,
      status: 'PENDING'
    });
  }


  jobUpdate(jobUpdateForm: NgForm) {
    if (jobUpdateForm.valid) {
      this.apiService.updateJob(jobUpdateForm.value).subscribe((response: any) => {
        this.showSuccessAlert(response.message);
        this.getJobData();
      },
        (error => {
          this.showFailedAlert(error);
        })
      );
    }
  }


  jobRepair(jobRepairForm: NgForm) {
    if (jobRepairForm.valid) {
      this.apiService.jobRepair(jobRepairForm.value).subscribe((response: any) => {
        this.showSuccessAlert(response.message);
        this.getJobData();
      },
        (error => {
          this.showFailedAlert(error);
        })
      );
    }
  }

  jobPay(jobPayForm: NgForm) {
    this.apiService.payJob(jobPayForm.value).subscribe((response: any) => {
      this.showSuccessAlert(response.message);
      this.getJobData();
    },
      (error => {
        this.showFailedAlert(error);
      })
    );
  }

  printInvoice(id: number) {
    this.apiService.searchOneJobById(id).subscribe((response: any) => {
      this.showSuccessAlert(response.message);
      this.oneJob= response.data;
        this.jobService.setJobData(this.oneJob);
        this.router.navigate(['/invoice']);
    },
      (error => {
        this.showFailedAlert(error);
      })
    );
  }

  jobPayAndPrint(jobPayAndPrint: NgForm, id: number) {
    this.apiService.payJob(jobPayAndPrint.value).subscribe((response: any) => {
      this.showSuccessAlert(response.message);
      this.apiService.searchOneJobById(id).subscribe((response: any) => {
        this.oneJob= response.data;
        this.jobService.setJobData(this.oneJob);
        this.router.navigate(['/invoice']);
      },
        (error => {
          this.showFailedAlert(error);
        })
      );
    },
      (error => {
        this.showFailedAlert(error);
      })
    );
  }


  deleteJob(jobId: number) {
    this.apiService.deleteJob(jobId).subscribe((response: any) => {
      this.showSuccessAlert(response.message);
      this.getJobData();
    },
      (error => {
        this.showFailedAlert(error);
      })
    );
  }

  checkAdmin(): boolean {
    return this.userAuthService.isAdmin();
  }

  showSuccessAlert(responseMessage: string): void {
    this.showSuccessResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showSuccessResponse = false;
    }, 5000);
  }

  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 5000);
  }

  refreshPage(): void{
    location.reload()
  }


}
