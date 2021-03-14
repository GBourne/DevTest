import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JobService } from '../services/job.service';
import {JobModel} from '../models/job.model'

import { JobDetailComponent } from './job-detail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe("JobDetailComponent", () => {
  let jobModel: JobModel;
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  const fakeActivatedRoute = {
    snapshot: { params: {} },
  } as ActivatedRoute;

  const fakeJobServicve = {
    GetJob(id) {
      return of(jobModel);
    },
  } as JobService;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [JobDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: JobService, useValue: fakeJobServicve },
      ],
    }).compileComponents();
  }));

 beforeEach(() => {
   fixture = TestBed.createComponent(JobDetailComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
