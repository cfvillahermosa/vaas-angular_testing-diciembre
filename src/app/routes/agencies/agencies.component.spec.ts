import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

describe('The Agencies Component instance ', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    spyOn(component, 'loadAgencies').and.callThrough();
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getAgencies$').and.returnValue(of([]));
    fixture.detectChanges();
    // component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loadAgencies).toHaveBeenCalled();
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});

const inputAgencies: Agency[] = [
  {
    id: 'space-x',
    name: 'SpaceX',
    range: 'Interplanetary',
    status: 'Active',
  },
  {
    id: 'blue-origin',
    name: 'Blue Origin',
    range: 'Orbital',
    status: 'Active',
  },
];

fdescribe('The Agencies Component view _isolated_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService;
  let native: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [HttpClientTestingModule, FormsModule], // * to include ngModel
      schemas: [
        NO_ERRORS_SCHEMA, // * to ignore template errors
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciesComponent);
    native = fixture.nativeElement;
    component = fixture.componentInstance;
    component.agencies = inputAgencies;
    fixture.detectChanges();
  });

  it('should present a table with agencies', () => {
    expect(component).toBeTruthy();
    const agenciesBodyRows = native.querySelectorAll('table>tbody>tr');
    expect(agenciesBodyRows.length).toBe(inputAgencies.length);
  });
  it('should call onDeleteClick on save button click', () => {
    spyOn(component, 'onDeleteClick');
    const deleteButton = native.querySelectorAll('table>tbody>tr>td>button')[0];
    deleteButton.click();
    expect(component.onDeleteClick).toHaveBeenCalled();
  });
});
