import { AuthService } from './../services/auth.service';
import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = "/assets/logo_icon.png";
  credentials:object;
  invalidLogin:boolean;
  constructor(public translate: TranslateService,private auth:AuthService, private router:Router, private  toastr: ToasterService ) { 
    translate.setDefaultLang('esp');
    translate.use('esp');
  }
  
  form = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  
  });


  ngOnInit() {
  }

  get username()
  {
    return this.form.get('username');
  }

  get password()
  {
    return this.form.get('password');
  }

  login()
  {
    let username=this.form.value.username;
    let password=this.form.value.password;
    this.credentials={'username':username,'password':password};
    this.auth.login(this.credentials)
    .subscribe(
      response=>
      {
        if(response)
        {
          this.toastr.success('Welcomes You!!','Delmond Express');
          this.router.navigate(['/dashboard']);
        }
        else
        {
          this.invalidLogin=true;
        }
      },
      (error: Response) =>
      {
        //console.log(typeof(error.json()));
        this.invalidLogin=true;
      }
    );
    
  }

}
