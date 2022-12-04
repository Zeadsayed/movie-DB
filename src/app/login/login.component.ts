import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err:string='';

  // loginForm:FormGroup=new FormGroup({
  //   userName:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
  //   password:new FormControl('',[Validators.required]),
  // })

  constructor(private _AuthService:AuthService , private _Router:Router){}

  OnLogin(loginform:any){
    console.log(loginform.value);

    this._AuthService.login(loginform.value).subscribe({
      next:(res)=>{
        if (res) {
          this._Router.navigate(['home']);
          localStorage.setItem('token',res.token);
          this._AuthService.saveUser();
        }
    
        else{
          this.err=res.message;
        }
      },error:(err)=>{
        console.log(err);
      }
    });
  }
}
