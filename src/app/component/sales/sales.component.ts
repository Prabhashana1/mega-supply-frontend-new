import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { ApiService } from 'src/app/service/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{

  public config: any;
  public chart: any;


  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getSalesByYear('2024').subscribe(response =>{
    const salesData = this.mapApiDataToChartData(response.data.monthlySales);
    console.log(response.data.monthlySales);
    console.log(response.data.totalYearlySales);
    console.log(salesData);
    
      this.config = {
        type: 'bar',
        data: {
          labels: ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULLY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              lable:'Sales',
              data: salesData,
              backgroundColor: '#0090c2',
            },
          ],
    
        },
        options:{
          aspectRatio: 1,
        },
      };
      this.chart = new Chart('Mychart', this.config);
      }
    );
  }

  private mapApiDataToChartData(monthlySales: any): number[] {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months.map(month => monthlySales[month] || 0);
  }

}
