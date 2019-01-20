import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: Http) {}

  login(credentials) {
    console.log(credentials);
    console.log(typeof credentials);
    return this.http
      .post("http://localhost:3000/admin/login", credentials)
      .pipe(
        map(response => {
          let result = response.json();
          result.token = "dfdsfdsfdsf23213";
          //console.log(result.token);
          if (result && result.token) {
            localStorage.setItem("token", result.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    let token = localStorage.getItem("token");
    let tokenId = { tokenId: token };
    return this.http.post("http://localhost:3000/admin/logout", tokenId).pipe(
      map(response => {
        let result = response.json();
        console.log(result);
        localStorage.removeItem("token");
        return true;
      })
    );
  }

  getToken() {
    let token = localStorage.getItem("token");
    return this.http
      .get("http://localhost:3000/tokens", { params: { id: token } })
      .pipe(
        map(response => {
          let result = response.json();
          return result;
        })
      );
  }

  isLoggedIn() {
    return this.tokenNotExpired();
  }

  tokenNotExpired() {
    let token = localStorage.getItem("token");

    if (!token) {
      return false;
    } else {
      return true;
    }

    //  let get_token = this.getToken();
    //   get_token.subscribe(response=>{
    //     console.log(response.expires);

    //   },error=>{
    //     console.log(error);
    //   });
  }
}
