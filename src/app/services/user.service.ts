import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class UserService {
  url: string = "http://localhost:3000";

  constructor(private http: Http) {}

  addUser(data) {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("username", data.username);
    fd.append("password", data.password);
    fd.append("email", data.email);
    fd.append("contact", data.contact);
    fd.append("address", data.address);
    fd.append("city", data.city);
    fd.append("image", data.image);

    return this.http.post(this.url + "/user/add", fd).pipe(
      map(response => {
        let result = response.json();
        return result;
      })
    );
  }

  updateUser(data) {
    const fd = new FormData();
    fd.append("id", data.id);
    fd.append("name", data.name);
    fd.append("username", data.username);
    fd.append("password", data.password);
    fd.append("email", data.email);
    fd.append("contact", data.contact);
    fd.append("address", data.address);
    fd.append("city", data.city);
    fd.append("image", data.image);

    return this.http.put(this.url + "/user/" + data.id, fd).pipe(
      map(response => {
        let result = response.json();
        return result;
      })
    );
  }

  getAllUser() {
    return this.http.get(this.url + "/user/getAll").pipe(
      map(response => {
        let result = response.json();
        //console.log(result);
        return result;
      })
    );
  }

  getUserDetails(id) {
    return this.http.get(this.url + "/user/" + id).pipe(
      map(response => {
        let result = response.json();
        //console.log(result);
        return result;
      })
    );
  }

  deleteUser(id) {
    return this.http.delete(this.url + "/user/" + id).pipe(
      map(response => {
        let result = response.json();
        console.log(result);
        return result.doc;
      })
    );
  }
}
