import { filter } from "rxjs/operators";
import { UserService } from "./../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  id: any;
  data: any;

  constructor(private user: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.pipe(filter(params => params.id)).subscribe(
      params => {
        this.id = params.id;
      },
      error => {
        console.log(error);
      }
    );

    this.user.getUserDetails(this.id).subscribe(
      response => {
        this.data = response.doc;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
