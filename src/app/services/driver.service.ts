import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DriverService {
  url: string = "http://localhost:3000";
  constructor(private http: Http) {}

  addDriver(data) {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("username", data.username);
    fd.append("password", data.password);
    fd.append("email", data.email);
    fd.append("address", data.address);
    fd.append("city", data.city);
    fd.append("vehicle", data.vehicle);
    fd.append("image1", data.image1);
    fd.append("image2", data.image2);
    return this.http.post(this.url + "/driver/add", fd).pipe(
      map(response => {
        let result = response.json();
        return result;
      })
    );
  }

  updateDriver() {}

  getAllDriver() {}

  getDriverDetails(id) {}

  delete() {}
}
