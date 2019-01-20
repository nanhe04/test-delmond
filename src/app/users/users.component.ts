import { ToasterService } from "./../services/toaster.service";
import { Router } from "@angular/router";
import { UserService } from "./../services/user.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  rowData: any;
  dataSource: any;
  displayedColumns: string[] = ["#", "name", "image", "city", "action"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private user: UserService,
    private route: Router,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    this.user.getAllUser().subscribe(
      response => {
        this.rowData = response.data;
        this.rowData = this.rowData.map((element, index) => {
          var data = {};
          data = {
            index: index + 1,
            _id: element._id,
            name: element.name,
            image: element.image,
            city: element.city
          };
          return data;
        });
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(id) {
    this.route.navigate(["/users/details"], { queryParams: { id: id } });
  }

  edit(id) {
    //console.log(id);
    this.route.navigate(["/users/edit/"], { queryParams: { id: id } });
  }

  delete(id) {
    this.user.deleteUser(id).subscribe(
      response => {
        this.toastr.success(`user name ${response.name} deleted successfully!`);
        this.ngOnInit();
      },
      error => {
        console.log(error);
        this.toastr.error(error);
      }
    );
  }
}
