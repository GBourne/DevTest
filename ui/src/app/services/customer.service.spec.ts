import { CustomerService } from './customer.service';
import {Observable, of} from 'rxjs';
import {CustomerModel} from '../models/customer.model'

describe('CustomerService', () => {
  let service:CustomerService;
  let mockHttp: {get:jasmine.Spy};

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get','post'])
    service = new CustomerService(mockHttp as any);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomer should return expected customer', () =>{
    it('should get a customer', ()=>{
      let customer:CustomerModel = {customerId:1, name:"Allan", type:1}
      let cust:CustomerModel = null

      mockHttp.get.and.returnValue(of(customer))
      service.GetCustomer(1).subscribe(
        result => expect(result).toEqual(customer,'expected customer'),
        fail
      )

      expect(mockHttp.get.calls.count()).toBe(1, "one call");

    })
  });

describe("getCustomers should return expected customer", () => {
  it("should get a customers", () => {
    let customers: CustomerModel[] = [{ customerId: 1, name: "Allan", type: 1 }];
    let cust: CustomerModel = null;

    mockHttp.get.and.returnValue(of(customers));
    service
      .GetCustomers()
      .subscribe(
        (result) => expect(result).toEqual(customers, "expected customers list"),
        fail
      );

    expect(mockHttp.get.calls.count()).toBe(1, "one call");
  });
});

});
