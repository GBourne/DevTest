import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerType } from 'src/app/models/customer-type.enum';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {

  customers: CustomerModel[] = [];

  origCustomer: CustomerModel = {
    customerId: null,
    name: null,
    type: null,
  };

  newCustomer:CustomerModel = {...this.origCustomer};

  eCustomerType = CustomerType;
  enumKeys = [];

  constructor(private customerService: CustomerService) {
    this.enumKeys = Object.keys(this.eCustomerType).filter((f) => !isNaN(Number(f)));
  }

  ngOnInit() {
    this.customerService.GetCustomers().subscribe({
      next: (result) => {
        this.customers = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public createCustomer(form: NgForm): void {
    if (form.invalid) {
      alert("form is not valid");
    } else {
      this.customerService.CreateCustomer(this.newCustomer).then(() => {
        this.customerService
          .GetCustomers()
          .subscribe((customers) => {
            this.customers = customers;
            this.newCustomer = {...this.origCustomer};
          });
      });
    }
  }
}
