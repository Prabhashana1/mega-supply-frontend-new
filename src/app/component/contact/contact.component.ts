
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUsForm } from 'src/app/model/ContactUs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(private apiService: ApiService) {}

  contactUsFormData: ContactUsForm ={
    email: '',
    phoneNumber: '',
    message: ''
  }

  showSuccessResponse: boolean = false;
  showFailedResponse: boolean = false;
  responseMessage: string = '';


  contactUsSubmit(contactUsForm: NgForm ){
    if(contactUsForm.valid){
      this.apiService.contactUs(contactUsForm.value).subscribe({
        next: (response) => {
        this.showSuccessAlert(response.message);
        contactUsForm.resetForm();
      },
      error: (error) => {
        this.showFailedAlert(error);
        contactUsForm.resetForm();
      }
    });
    }
  }


  showSuccessAlert(responseMessage: string): void {
    this.showSuccessResponse = true;
    this.responseMessage = responseMessage;
    setTimeout(() => {
      this.showSuccessResponse = false;
    }, 5000);
  }

  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.responseMessage = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 5000);
  }



}
