import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobRepairForm } from 'src/app/model/JobRepair';
import { JobSaveForm } from 'src/app/model/JobSave';
import { ApiService } from 'src/app/service/api.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

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

  jobRepairForm: JobRepairForm = {
    id: 0,
    status: ''
  }

  openJobRepairModal(job: any): void{
    this.jobRepairForm = { ...job };
  }


  constructor(private apiService: ApiService, private userAuthService: UserAuthService) { }


  ngOnInit(): void {
    this.getJobData();
  }


  getJobData() {
    this.apiService.getJobData().subscribe({
      next: (response) => {
        this.jobData = response.data;
        this.isAdmin = this.checkAdmin();

      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch job data. Please try again later.', error;
        this.showError = true;
      }
    });
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


  jobRepair(jobRepairForm: NgForm){
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


}
