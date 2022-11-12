import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  //Navigate to movies
  goToMovies(): void {
    this.router.navigate(['movies'])
  }

  //Navigate to movies
  goToProfile(): void {
    this.router.navigate(['profile'])
  }

  //Logout
  logOut(): void {
    this.router.navigate(['welcome'])
  }
}
