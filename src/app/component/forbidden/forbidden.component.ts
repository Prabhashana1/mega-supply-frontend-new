import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  constructor(private userAuthService: UserAuthService, private router: Router){}

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

}
