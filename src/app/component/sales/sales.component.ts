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
  yearTotalSalse: number = 0;
  year: number = 0;
  monthTotalSales: number = 0;
  year2: number = 2024;
  month: string = 'DECEMBER';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSalesByYear('2024').subscribe({
      next: (response) => {
        const salesData = this.mapApiDataToChartData1(response.data.monthlySales);
        this.yearTotalSalse = response.data.totalYearlySales;
        this.year = response.data.year;
        this.config = {
          type: 'bar',
          data: {
            labels: ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [
              {
                label: 'Sales for ' + this.year,
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
      }, error: (error) => {
        if (error.status === 0) {
          this.showFailedAlert('Server is currently unavailable. Please try again later...');
        } else {
          this.showFailedAlert(error.error.message);
        }

      }
    });


    console.log(this.generateLabelsForMonth());
    
    this.apiService.getDailySalesByMonth(this.year2, 12) // Change 12 to the required month number
      .subscribe({
        next: (response) => {
          const dailySalesData = this.mapApiDataToChartData(response.data.dailySales);
          console.log(dailySalesData);
          
          this.monthTotalSales = response.data.totalMonthlySales;
          this.year2 = response.data.year;
          this.month = response.data.month;
          this.config = {
            type: 'bar',
            data: {
              labels: this.generateLabelsForMonth(),
              datasets: [
                {
                  label: `Sales for ${this.month} ${this.year2}`,
                  data: dailySalesData,
                  backgroundColor: '#0090c2',
                },
              ],
            },
            options: {
              aspectRatio: 1,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Days'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Sales'
                  },
                  beginAtZero: true
                }
              }
            },
          };

          this.chart = new Chart('MyChart2', this.config);
        }, 
        error: (error) => {
          if (error.status === 0) {
            this.showFailedAlert('Server is currently unavailable. Please try again later...');
          } else {
            this.showFailedAlert(error.error.message);
          }
        }
      });




  }

  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 10000);
  }


  private mapApiDataToChartData1(monthlySales: any): number[] {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months.map(month => monthlySales[month] || 0);
  }

  private mapApiDataToChartData(dailySales: any): number[] {
    return dailySales.map((day: any) => day.totalSales || 0);
  }

  private generateLabelsForMonth(): string[] {
    const daysInMonth = new Date(this.year, 12, 0).getDate(); // Change 12 to the required month number
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  }

}


/*
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



*/











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

