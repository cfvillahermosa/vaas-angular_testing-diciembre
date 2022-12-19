import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;
  let activatedRoute: ActivatedRoute;
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (paramId: string) => {
          if (paramId == 'badParam') return null;
          return paramId;
        },
      },
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
    });
    utilsService = TestBed.inject(UtilsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should get the value of the default param from the ActivatedRoute', () => {
    expect(utilsService.getParam(activatedRoute)).toEqual('id');
  });

  it('should get the value of the specified param from the ActivatedRoute', () => {
    expect(utilsService.getParam(activatedRoute, 'tripId')).toEqual('tripId');
  });

  it('should get an empty string for a not found param', () => {
    expect(utilsService.getParam(activatedRoute, 'badParam')).toEqual('');
  });
});
