import { ToasterService } from "./../../services/toaster.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"]
})
export class UserAddComponent implements OnInit {
  // variables.

  err_msg: object;
  err: boolean;
  selectedFile: File = null;
  id: any;
  name: string;
  username: string;
  password: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  image: string;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private userID: string;
  constructor(
    private user: UserService,
    private route: Router,
    private aroute: ActivatedRoute,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    // setting up validations.

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      username: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      email: new FormControl(null, { validators: [Validators.required] }),
      contact: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.aroute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.userID = paramMap.get("id");
        this.user.getUserDetails(this.userID).subscribe(resultData => {
          console.log(resultData);
          this.imagePreview = resultData.doc.image;
          this.form.setValue({
            name: resultData.doc.name,
            username: resultData.doc.username,
            password: resultData.doc.password,
            email: resultData.doc.email,
            contact: resultData.doc.mobile,
            address: resultData.doc.address,
            city: resultData.doc.city,
            image: resultData.doc.image
          });
        });
      } else {
        this.mode = "create";
        this.userID = null;
        //console.log(this.mode);
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveUser() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
      const data = {
        name: this.form.value.name,
        username: this.form.value.username,
        password: this.form.value.password,
        email: this.form.value.email,
        contact: this.form.value.contact,
        address: this.form.value.address,
        city: this.form.value.city,
        image: this.form.value.image
      };

      this.user.addUser(data).subscribe(
        response => {
          //console.log(response);
          this.toastr.success("user added successfully");
          this.route.navigate(["/users"]);
        },
        error => {
          this.err = true;
          this.err_msg = JSON.parse(error._body).message;
          this.toastr.error(this.err_msg);
        }
      );
    } else {
      const data = {
        id: this.userID,
        name: this.form.value.name,
        username: this.form.value.username,
        password: this.form.value.password,
        email: this.form.value.email,
        contact: this.form.value.contact,
        address: this.form.value.address,
        city: this.form.value.city,
        image: this.form.value.image
      };

      this.user.updateUser(data).subscribe(
        response => {
          //console.log(response);
          this.toastr.success("user updated successfully");
          this.route.navigate(["/users"]);
        },
        error => {
          this.err = true;
          this.err_msg = JSON.parse(error._body).message;
          this.toastr.error(this.err_msg);
        }
      );
    }
  }
}
