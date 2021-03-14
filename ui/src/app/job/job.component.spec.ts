import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { JobModel } from '../models/job.model';
import { CustomerService } from '../services/customer.service';
import { EngineerService } from '../services/engineer.service';
import { JobService } from '../services/job.service';

import { JobComponent } from './job.component';

describe('JobComponent', () => {
  let component: JobComponent;
  let fixture: ComponentFixture<JobComponent>;

  let jobModel:JobModel[]
  let custModel:CustomerModel[];
  let engModel:string[];

  const fakeEngineerServicve = {
    GetEngineers() {
      return of(engModel);
    },
  } as EngineerService;

  const fakeJobServicve = {
    GetJobs() {
      return of(jobModel);
    },
  } as JobService;

  const fakeCustomerServicve = {
    GetCustomers() {
      return of(custModel);
    },
  } as CustomerService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [JobComponent],
      providers: [
        { provide: CustomerService, useValue: fakeCustomerServicve },
        { provide: EngineerService, useValue: fakeEngineerServicve },
        { provide: JobService, useValue: fakeJobServicve },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
