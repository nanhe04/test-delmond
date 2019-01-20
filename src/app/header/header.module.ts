import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


//Aot require an exported function for factories

export function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
    loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
 
  declarations: [],
  exports:[
    
  ]
})
export class HeaderModule { }
