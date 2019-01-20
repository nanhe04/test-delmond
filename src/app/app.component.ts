import { AuthService } from "./services/auth.service";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  token: boolean;
  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    translate.setDefaultLang("esp");
    translate.use("esp");
    //console.log(this.route);
  }
  ngOnInit() {
    let storage = localStorage.getItem("token");
    if (storage) {
      this.token = true;
    } else {
      this.token = false;
    }
  }
}
