import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogin:boolean = false;

  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: ()=> {
        if (this._AuthService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
  }

}
