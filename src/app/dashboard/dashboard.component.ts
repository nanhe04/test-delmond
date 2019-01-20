import { ToasterService } from './../services/toaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lat:number = 51.678418;
  lng:number = 7.809007;
  constructor(private toastr: ToasterService) { }

  ngOnInit() {
    //this.toastr.info('Delmond Express , Welcomes You!');
  }

}
