import { Injectable } from "@angular/core";
declare var toastr:any;
@Injectable({
  providedIn:'root',
})
export class ToasterService{

    constructor(){
      this.setting();
    }

    success(message:any,title?:string)
    {
        toastr.success(message,title);
    }

    error(message:any,title?:string)
    {
      toastr.error(message,title);
    }

    warning(title:string,message?:any)
    {
      toastr.warning(message,title);
    }

    info(message:any)
    {
      toastr.info(message);
    }

    setting()
    {
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
    }
}