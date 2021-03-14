import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EngineerService } from '../services/engineer.service';
import { JobService } from '../services/job.service';
import { JobModel } from '../models/job.model';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { forkJoin } from "rxjs";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnInit {
  engineers: string[] = [];
  jobs: JobModel[] = [];
  customers: CustomerModel[] = [];
  errorMsg = "";

  public origJob: JobModel = {
    jobId: null,
    engineer: null,
    when: null,
    customerId: null,
    customerName: null,
    customerType: null,
  };

  public newJob:JobModel = {...this.origJob}

  constructor(
    private engineerService: EngineerService,
    private jobService: JobService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    let joined = forkJoin(
      this.engineerService.GetEngineers(),
      this.jobService.GetJobs(),
      this.customerService.GetCustomers()
    ).subscribe((results) => {
      this.engineers = results[0];
      this.jobs = results[1];
      this.customers = results[2];
    });
  }

  createJob(form: NgForm): void {
    if (form.invalid) {
      alert("form is not valid");
    } else {
      this.jobService.CreateJob(this.newJob).then(
        () => {
          this.jobService.GetJobs().subscribe((jobs) => {
            this.jobs = jobs;
            this.newJob = {...this.origJob};
          });
          this.errorMsg = ""
        },
        (err) => {
          this.errorMsg = err.error;
        }
      );
    }
  }
}
