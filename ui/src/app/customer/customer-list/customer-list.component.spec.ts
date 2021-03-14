import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let model: CustomerModel[];

  const fakeCustomerServicve = {
    GetCustomers() {
      return of(model);
    },
  } as CustomerService;

  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [CustomerListComponent],
      providers: [{ provide: CustomerService, useValue: fakeCustomerServicve }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });

});
