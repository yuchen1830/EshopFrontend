import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  // @Input() userInfo: { firstName: string } = { firstName: 'Login/Register' };
  @Input() userInfo: { firstName: string } | null = null;

  // display different nav-bar for different login status
  get isLoggedIn(): boolean {
    return this.userInfo !== null;
  }

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProduct() {
    this.router.navigate(['/product']);
  }

  goToOrder() {
    this.router.navigate(['/order']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  // need implementation
  updatePassword() {
    console.log("update pass")
  }

  // cookie???
  async logout() {
    alert('Logging out...');
    this.userInfo = null;
    this.router.navigate(['/product']);
  }

  ngOnInit() {
  }

}
