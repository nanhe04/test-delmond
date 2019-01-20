import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ToasterService } from "./../../services/toaster.service";
import { mimeType } from "./mime-type.validator";
import { DriverService } from "./../../services/driver.service";

@Component({
  selector: "app-driver-add",
  templateUrl: "./driver-add.component.html",
  styleUrls: ["./driver-add.component.css"]
})
export class DriverAddComponent implements OnInit {
  // variables

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
  imagePreview1: string;
  imagePreview2: string;
  private mode = "create";
  private driverID: string;
  constructor(
    private driver: DriverService,
    private route: Router,
    private aroute: ActivatedRoute,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    // settings up validations.

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
      vehicle: new FormControl(null, { validators: [Validators.required] }),
      image1: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      image2: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    // getting params for add or edit page.

    this.aroute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.driverID = paramMap.get("id");
        // this.driver.getDriverDetails(this.driverID).subscribe(resultData => {
        //   console.log(resultData);
        // });
      } else {
        this.mode = "create";
        this.driverID = null;
      }
    });
  }

  onImagePicked1(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({ image: File });
    this.form.get("image1").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview1 = reader.result;
      //console.log(this.imagePreview1);
    };
    reader.readAsDataURL(file);
  }

  onImagePicked2(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({ image: File });
    this.form.get("image2").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview2 = reader.result;
      //console.log(this.imagePreview2);
    };

    reader.readAsDataURL(file);
  }

  saveDriver() {
    if (this.form.invalid) {
      console.log("invalid validations");
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
        vehicle: this.form.value.vehicle,
        image1: this.form.value.image1,
        image2: this.form.value.image2
      };

      this.driver.addDriver(data).subscribe(
        response => {
          console.log(response);
          this.toastr.success("driver Added successfully");
          this.route.navigate(["/drivers"]);
        },
        error => {
          this.err = true;
          console.log(error);
          //this.err_msg = JSON.parse(error._body).message;
          //this.toastr.error(this.err_msg);
        }
      );
    } else {
    }
  }
}
