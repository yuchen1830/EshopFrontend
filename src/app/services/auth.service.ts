import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// this is using hardcoded user id for development without login 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;
  isLoggedIn: boolean = true;

  constructor(private router: Router) {}

  login(userId: number) {
    this.userId = userId;
    this.isLoggedIn = true;
    console.log("User logged in with ID:", this.userId);
  }

  logout() {
    alert('Logging out...');
    console.log("User logged out");
    this.userId = null;
    this.isLoggedIn = false;
    this.router.navigate(['/products']);
  }

  getUserId(): number | null {
    return this.userId;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

}
