import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerType } from 'src/app/models/customer-type.enum';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"],
})
export class CustomerDetailComponent implements OnInit {
  customerId: number;
  customer: CustomerModel;

  eCustomerType = CustomerType;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customerId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.customerService.GetCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
