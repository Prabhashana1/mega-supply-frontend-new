import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-viewlink',
  templateUrl: './viewlink.component.html',
  styleUrls: ['./viewlink.component.scss'],
  providers: [DatePipe]
})
export class ViewlinkComponent implements OnInit{

  token: string = '';
  tokenData: any;
  showFailedResponse: boolean = false;
  message: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private datePipe: DatePipe){}


  getFormattedDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd hh:mm:ss a') || '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
      if(this.token){
        this.getTokenData();
      }else{
        this.showFailedAlert('Not token found in this URL');
        
      }

    });
  }

  getTokenData(): void{
    this.apiService.viewCreatedLink(this.token).subscribe({
      next: (response) => {
        this.tokenData = response.data; 
      },error: (error) => {
        this.showFailedAlert('Error fetching URL data: '+error.message); 
    }
    });
  }



  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 5000);
  }




}
