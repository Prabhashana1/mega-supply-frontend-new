import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart , registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{

  public config: any = {
    type: 'bar',
    data: {
      labels: ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULLY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          lable:'Sales',
          data: ['456', '576', '335', '200', '100', '300', '400', '350', '300', '450', '320', '678'],
          backgroundColor: '#0090c2',
        },
      ],

    },
    options:{
      aspectRatio: 1,
    },
  };
  chart: any;

  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config);
    this.chart = new Chart('MyChart2', this.config);
  }

}
