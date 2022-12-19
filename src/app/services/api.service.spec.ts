import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

class UtilsServiceStub {
  getHyphened() {
    return 'space-y';
  }
}

fdescribe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // const utilsServiceStub = {
    //   getHyphened() {
    //     return 'space-y';
    //   },
    // };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // { provide: UtilsService, useValue: utilsServiceStub }
        { provide: UtilsService, useClass: UtilsServiceStub },
      ],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the delete method with the right url', () => {
    service.deleteAgency$('space-x').subscribe();
    const spyUrl = httpTestingController.expectOne(
      'http://localhost:3000/agencies/space-x'
    );
    expect(spyUrl.request.method).toEqual('DELETE');
  });

  it('should return right data when calling get method ', () => {
    const expected = [
      {
        id: 'space-y',
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      },
      {
        id: 'green-origin',
        name: 'Green Origin',
        range: 'Orbital',
        status: 'Active',
      },
    ];
    service
      .getAgencies$()
      .subscribe((actual) => expect(actual).toEqual(expected));
    const stubUrl = httpTestingController.expectOne(
      'http://localhost:3000/agencies'
    );
    stubUrl.flush(expected);
  });

  it('should call post method with the right url and payload', () => {
    const input = {
      id: '',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    service.postAgency$(input).subscribe();
    const spyUrl = httpTestingController.expectOne(
      'http://localhost:3000/agencies'
    );
    expect(spyUrl.request.method).toEqual('POST');
    expect(spyUrl.request.body).toEqual({
      id: 'space-y',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    });
  });
});
