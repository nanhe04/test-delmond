import { ToasterService } from './../services/toaster.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logo = "assets/logo.png";
  en_logo = "assets/lang_english.png";
  esp_logo = "assets/lang_spanish.png";
  today: number;
  name:string;
  constructor(public translate: TranslateService,private auth:AuthService,private route:Router,private toastr:ToasterService)
   {
     translate.setDefaultLang('esp');
     translate.use('esp');
     setInterval(()=>{
       this.today = Date.now();
     },1000);
   }

  ngOnInit() {
     this.auth.getToken()
     .subscribe(
       response=>
       {      
          //console.log(response.data[0].name);
          this.name=response.data[0].name;
       }       
       ,
       error=>
       {
         console.log(error);
       }
     )
  }

  logout()
  {
    this.auth.logout()
    .subscribe(
      response=>
      {
         this.toastr.success('You logged Out Successfully','');
         this.route.navigate(['']);
      }
      ,
      error=>
      {
           console.log(error);
      }
    )
  }


}
