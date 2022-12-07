import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err:string='';

  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][0-9]{3,10}$')]),
  });

  constructor(private _AuthService:AuthService , private _Router:Router){}

  OnLogin(formData:FormGroup){
    console.log(formData.value);
    
    this._AuthService.login(formData.value).subscribe((res)=>{
      console.log(res);
      if(res.message=='success'){
        this._Router.navigate(['home'])
        // localStorage.setItem('accessToken',res.token)
      }
      else{
        this.err=res.message
      }
      
    },(err)=>{

    },()=>{

    });

  }
}
