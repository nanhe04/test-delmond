import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
// material angular.
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";

// services
import { AdminService } from "./services/admin.service";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { ToasterService } from "./services/toaster.service";
// components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UsersComponent } from "./users/users.component";
import { DriversComponent } from "./drivers/drivers.component";
import { AdvertisementComponent } from "./advertisement/advertisement.component";
import { AgmCoreModule } from "@agm/core";
import { CityComponent } from "./settings/city/city.component";
import { VehiclesComponent } from "./settings/vehicles/vehicles.component";
import { CommissionComponent } from "./settings/commission/commission.component";
import { PriceManagementComponent } from "./settings/price-management/price-management.component";
import { DeliveryRangeComponent } from "./settings/delivery-range/delivery-range.component";
import { TermsConditionsComponent } from "./settings/terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./settings/privacy-policy/privacy-policy.component";
import { SpecialDeliveryRuleComponent } from "./settings/special-delivery-rule/special-delivery-rule.component";
import { ServiceChargeComponent } from "./settings/service-charge/service-charge.component";
import { OrdersComponent } from "./orders/orders.component";
import { ReportsComponent } from "./reports/reports.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { SharedComponent } from "./shared/shared.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";
import { DriverAddComponent } from "./drivers/driver-add/driver-add.component";
import { DriverDetailsComponent } from "./drivers/driver-details/driver-details.component";
import { DriverSharedComponent } from "./drivers/driver-shared/driver-shared.component";
import { DriverHistoryComponent } from "./drivers/driver-history/driver-history.component";
import { DriverEarningComponent } from "./drivers/driver-earning/driver-earning.component";
import { AdvertisementAddComponent } from "./advertisement/advertisement-add/advertisement-add.component";
import { AdminUserAddComponent } from "./admin-users/admin-user-add/admin-user-add.component";
import { AdminUserDetailsComponent } from "./admin-users/admin-user-details/admin-user-details.component";
import { CityAddComponent } from "./settings/city/city-add/city-add.component";
import { VehicleAddComponent } from "./settings/vehicles/vehicle-add/vehicle-add.component";
import { VehicleSortComponent } from "./settings/vehicles/vehicle-sort/vehicle-sort.component";
import { ServiceChargeAddComponent } from "./settings/service-charge/service-charge-add/service-charge-add.component";
import { PriceManagementAddComponent } from "./settings/price-management/price-management-add/price-management-add.component";
//Aot require an exported function for factories

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const MaterialModules = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    UsersComponent,
    DriversComponent,
    AdvertisementComponent,
    CityComponent,
    VehiclesComponent,
    CommissionComponent,
    PriceManagementComponent,
    DeliveryRangeComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    SpecialDeliveryRuleComponent,
    ServiceChargeComponent,
    OrdersComponent,
    ReportsComponent,
    ContactsComponent,
    AdminUsersComponent,
    PlaceOrderComponent,
    SharedComponent,
    ProfileComponent,
    UserAddComponent,
    UserDetailsComponent,
    DriverAddComponent,
    DriverDetailsComponent,
    DriverSharedComponent,
    DriverHistoryComponent,
    DriverEarningComponent,
    AdvertisementAddComponent,
    AdminUserAddComponent,
    AdminUserDetailsComponent,
    CityAddComponent,
    VehicleAddComponent,
    VehicleSortComponent,
    ServiceChargeAddComponent,
    PriceManagementAddComponent
  ],
  imports: [
    MaterialModules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AgGridModule.withComponents([]),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBE2fg2RpvmGQFNlp0nQDHiWNU2j9TQpXQ"
    }),
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "users/add", component: UserAddComponent },
      { path: "users/edit/:id", component: UserAddComponent },
      { path: "users/details", component: UserDetailsComponent },
      { path: "users", component: UsersComponent },
      { path: "drivers/add", component: DriverAddComponent },
      { path: "drivers/shared", component: DriverSharedComponent },
      { path: "drivers/earning", component: DriverEarningComponent },
      { path: "drivers/history", component: DriverHistoryComponent },
      { path: "drivers/:id", component: DriverDetailsComponent },
      { path: "drivers", component: DriversComponent },
      { path: "advertisements/add", component: AdvertisementAddComponent },
      { path: "advertisements", component: AdvertisementComponent },
      { path: "city/add", component: CityAddComponent },
      { path: "city", component: CityComponent },
      { path: "vehicles/add", component: VehicleAddComponent },
      { path: "vehicles/sort", component: VehicleSortComponent },
      { path: "vehicles", component: VehiclesComponent },
      { path: "commission", component: CommissionComponent },
      { path: "price-management/add", component: PriceManagementAddComponent },
      { path: "price-management", component: PriceManagementComponent },
      { path: "delivery-range", component: DeliveryRangeComponent },
      { path: "terms-conditions", component: TermsConditionsComponent },
      { path: "privacy-policy", component: PrivacyPolicyComponent },
      {
        path: "special-delivery-rule",
        component: SpecialDeliveryRuleComponent
      },
      { path: "service-charge/add", component: ServiceChargeAddComponent },
      { path: "service-charge", component: ServiceChargeComponent },
      { path: "orders", component: OrdersComponent },
      { path: "reports", component: ReportsComponent },
      { path: "contacts", component: ContactsComponent },
      { path: "admin-users/add", component: AdminUserAddComponent },
      { path: "admin-users/:id", component: AdminUserDetailsComponent },
      { path: "admin-users", component: AdminUsersComponent },
      { path: "place-order", component: PlaceOrderComponent },
      { path: "shared", component: SharedComponent },
      { path: "profile", component: ProfileComponent },
      { path: "**", component: LoginComponent }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AdminService, AuthService, UserService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
