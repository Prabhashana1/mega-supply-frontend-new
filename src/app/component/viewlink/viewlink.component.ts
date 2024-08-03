import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-viewlink',
  templateUrl: './viewlink.component.html',
  styleUrls: ['./viewlink.component.scss']
})
export class ViewlinkComponent implements OnInit{

  token: string = '';
  tokenData: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService){}



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
      if(this.token){
        this.getTokenData();
      }else{
        console.log('Not token');
        
      }

    });
  }

  getTokenData(): void{
    this.apiService.viewCreatedLink(this.token).subscribe((response: any ) => {
      console.log('Token Data:', response);
      this.tokenData = response; 
    },(error) => {
      console.error('Error fetching token data:', error);
    });
  }





}
