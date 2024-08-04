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
      labels: ['JAN', 'FEB'],
      datasets: [
        {
          lable:'Sales',
          data: ['456', '576'],
          backgroundColor: 'blue',
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
  }

}
