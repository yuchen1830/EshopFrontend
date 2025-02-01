import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface Nav{
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  // @Input() userInfo: { firstName: string } = { firstName: 'Login/Register' };
  @Input() userInfo: { firstName: string } | null = null;

  // get isLoggedIn(): boolean {
  //   return this.userInfo !== null;
  // }
  isLoggedIn: boolean = true;
  nav:Nav[] =[
    {
      link:'/products',
      name:'Products',
      exact: true
    },
    {
      link:'/orders',
      name:'Orders',
      exact: true
    },
    {
      link:'/cart',
      name:'Cart',
      exact: true
    },
  ]

  // user dropdown menu
  dropdownOpen = false; 
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  onOptionSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    
    if (selectedValue === 'logout') {
      this.logout();
    } else if (selectedValue === 'updatePassword') {
      this.updatePassword();
    }
  }

  constructor(private router: Router, public authService:AuthService) { }

  updatePassword() {
    console.log("update pass: redirect page to login")
  }

  logout(){
    this.authService.logout();
    this.dropdownOpen = false;
  }

  // async logout() {
  //   alert('Logging out...');
  //   console.log("user logged out")
  //   this.isLoggedIn = false;
  //   this.dropdownOpen = false;
  //   // this.userInfo = null;
    
  //   this.router.navigate(['/products']);
  // }

  ngOnInit() {
  }

}
