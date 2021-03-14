import { TestBed } from '@angular/core/testing';
import { EngineerService } from './engineer.service';

describe('EngineerService', () => {
  let engineerService:EngineerService,
      mockHttp
  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockHttp = jasmine.createSpyObj('mockHttp', ['get'])
    engineerService = new EngineerService(mockHttp);
  });

  it('should be created', () => {

    expect(engineerService).toBeTruthy();
  });
});
