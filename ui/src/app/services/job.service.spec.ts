import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';

describe("JobService", () => {
  let jobService: JobService, mockHttp;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockHttp = jasmine.createSpyObj("mockHttp", ["get"]);
    jobService = new JobService(mockHttp);
  });

  it("should be created", () => {

    expect(jobService).toBeTruthy();
  });
});
