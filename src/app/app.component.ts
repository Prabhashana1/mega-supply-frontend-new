import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set the flag based on the current route
        this.showHeaderFooter = !event.url.includes('/invoice');
      }
    });
  }


  ngOnInit(): void {
  }
  title = 'mega-supply-frontend-new';
  showHeaderFooter = true;
}
