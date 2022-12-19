import { TestBed } from '@angular/core/testing';
import { ApiService } from '@services/api.service';

import { HomeService } from './home.service';

fdescribe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', ['getTrips$']),
        },
      ],
    });
    service = TestBed.inject(HomeService);
    service['tripsStore'] = jasmine.createSpyObj('ApiStore', [
      'setIsWorking',
      'setData',
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
