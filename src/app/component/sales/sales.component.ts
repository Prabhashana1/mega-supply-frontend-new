import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/service/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public config: any;
  public chart: any;
  showFailedResponse: boolean = false;
  message: string = '';
  yearTotalSalse:number = 0;
  year:number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSalesByYear('2024').subscribe(response => {
      const salesData = this.mapApiDataToChartData(response.data.monthlySales);
      this.yearTotalSalse = response.data.totalYearlySales;
      this.year = response.data.year;
      this.config = {
        type: 'bar',
        data: {
          labels: ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Sales for '+this.year,
              data: salesData,
              backgroundColor: '#0090c2',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      };

      this.chart = new Chart('MyChart', this.config);
    });
  }

  private mapApiDataToChartData(monthlySales: any): number[] {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months.map(month => monthlySales[month] || 0);
  }

  }














  /*


  salesData: any;
  showFailedResponse: boolean = false;
  message: string = '';

  constructor(private apiService: ApiService) { }

  getYearSalesData(): void {
    this.apiService.getSalesByYear('2024').subscribe({
      next: (response) => {
        this.salesData = this.mapApiDataToChartData(response.data.monthlySales);
      }, error: (error) => {
        if (error.status === 0) {
          this.showFailedAlert('Server is currently unavailable. Please try again later...');
        } else {
          this.showFailedAlert(error.error.message);
        }

      }
    });
  }

  public config: any = {
    type: 'bar',
    data: {
      labels: ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULLY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          lable: 'Sales',
          data: [this.salesData],
          backgroundColor: '#0090c2',
        },
      ],

    },
    options: {
      aspectRatio: 1,
    },
  };
  chart: any;

  ngOnInit(): void {
    this.getYearSalesData();
    this.chart = new Chart('MyChart', this.config);
  }


  private mapApiDataToChartData(monthlySales: any): number[] {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months.map(month => monthlySales[month] || 0);
  }

  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 10000);
  }*/

