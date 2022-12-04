import { Component } from '@angular/core';
import {FormGroup,FormControl ,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  err:string='';

  show:boolean=false;

  registerForm:FormGroup=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    last_name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern('^[A-Z][0-9]{3,10}$')]),
    age:new FormControl('',[Validators.required,Validators.min(16),Validators.max(60)]),
  })

  constructor(private _AuthService:AuthService, private _Router:Router){}

  OnSubmit(formData:FormGroup){
    console.log(formData.value);

    this._AuthService.register(formData.value).subscribe((res)=>{
      console.log(res);
      
      if (res.message=='success') {
        this._Router.navigate(['login']);
      }

     else{
        this.err=res.errors.email.message
      }

    },(err)=>{
      console.log(err);
      
    },()=>{
      formData.reset();
    });

  }

}
