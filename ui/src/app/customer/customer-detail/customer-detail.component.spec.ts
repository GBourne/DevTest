import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
let model: CustomerModel;
let component: CustomerDetailComponent;
let fixture: ComponentFixture<CustomerDetailComponent>;

const fakeActivatedRoute = {
  snapshot: { params: {} },
} as ActivatedRoute;

const fakeCustomerServicve = {
  GetCustomer(id) {
    return of(model);
  },
} as CustomerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CustomerDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: CustomerService, useValue: fakeCustomerServicve },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

});
