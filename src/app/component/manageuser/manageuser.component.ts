import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPasswordRestForm } from 'src/app/model/ResetUserPassword';
import { UserSaveForm } from 'src/app/model/UserSave';
import { UserUpdateForm } from 'src/app/model/UserUpdate';
import { ApiService } from 'src/app/service/api.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss']
})
export class ManageuserComponent implements OnInit {

  userData: any[] = [];
  errorMessage: string = '';
  showError: boolean = false;
  showSuccessResponse: boolean = false;
  showFailedResponse: boolean = false;
  message: string = '';
  selectedRole: string;
  passwordFieldType: string = 'password';
  selectedUserData: any = null;
  passwordMismatch: boolean = false;


  constructor(private apiService: ApiService) {
    this.selectedRole = 'USER';
  }

  ngOnInit(): void {
    this.getUserData();
  }

  form: UserSaveForm = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    idNumber: ''

  }

  updateFormData: UserUpdateForm = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    idNumber: ''
  }

  resetPasswordFormData: UserPasswordRestForm = {
    id: 0,
    password: ''
  }


  getUserData() {
    this.apiService.getUserData().subscribe({
      next: (response) => {
        this.userData = response.data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user data. Please try again later.', error;
        this.showError = true;
      }
    });
  }

  addUserDataForUpdate(user: any) {
    this.updateFormData = user;
  }

  addUserDataForDeleteUser(user: any) {
    this.selectedUserData = user;
  }


  addUserDataForRestPassword(user: any){
    this.resetPasswordFormData = user;
    
  }

  resetPassword(resetPasswordForm: NgForm) {
    if (resetPasswordForm.valid) {
      this.apiService.resetUserPassword(this.resetPasswordFormData).subscribe({
        next: (response) => {
          this.showSuccessAlert(response.message);
          this.getUserData(); // Refresh the user data
        },
        error: (error) => {
          this.showFailedAlert(error);
        }
      });
    }
  }


  updateUser(updateForm: NgForm) {
      if (updateForm.valid) {
        this.apiService.updateUser(this.updateFormData).subscribe({
          next: (response) => {
            this.showSuccessAlert(response.message);
            this.getUserData(); // Refresh the user data
          },
          error: (error) => {
            this.showFailedAlert(error);
          }
        });
      }
  }



  addUserAccount(userSaveForm: NgForm) {

    if (userSaveForm.valid) {
      if (this.selectedRole === 'USER') {
        this.apiService.addUserAccount(userSaveForm.value).subscribe((response: any) => {
          this.showSuccessAlert(response.message);
          this.getUserData();
          userSaveForm.resetForm();

        },
          (error => {
            this.showFailedAlert(error);
            userSaveForm.resetForm();
          })
        );
      } else if (this.selectedRole === 'ADMIN') {
        this.apiService.addAdminAccount(userSaveForm.value).subscribe((response: any) => {
          this.showSuccessAlert(response.message);
          this.getUserData();
          userSaveForm.resetForm();
        },
          (error => {
            this.showFailedAlert(error);
            userSaveForm.resetForm();
          })
        );
      } else {
        this.showFailedAlert('Something went wrong relevent user role!');
        userSaveForm.resetForm();
      }
    }
  }



  deleteUser(userId: number) {
    this.apiService.deleteUser(userId).subscribe((response: any) => {
      this.showSuccessAlert(response.message);
      this.getUserData();
    },
      (error => {
        this.showFailedAlert(error);
      })
    );
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

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}


