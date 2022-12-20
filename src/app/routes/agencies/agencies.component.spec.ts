import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
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

describe('The Agencies Component view _isolated_', () => {
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

describe('The Agencies Component view _isolated_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiServiceStub: any;
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
  beforeEach(async () => {
    // * stub the ApiService with predefined output
    apiServiceStub = {
      getAgencies$: () => of(inputAgencies),
      getOptions$: (r: string) => of([]),
      postAgency$: (a: Agency) => of(a),
      deleteAgency$: (a: string) => of({}),
    };
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [
        NO_ERRORS_SCHEMA, // * to ignore template errors while not importing FormsModule
      ],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    component.agencies = inputAgencies;
    fixture.detectChanges();
  });
  it('should present a table with agencies', () => {
    const native = fixture.nativeElement;
    const agenciesTable = native.querySelector('table');
    expect(agenciesTable).toBeTruthy();
    let agenciesBodyRows = native.querySelectorAll('tbody>tr');
    expect(agenciesBodyRows.length).toBe(inputAgencies.length);
  });
  it('should call onDeleteClick on delete button click', () => {
    spyOn(component, 'onDeleteClick'); // * spy the method
    const native = fixture.nativeElement;
    const deleteButtons = native.querySelectorAll('tbody>tr>td>button');
    const firstButton = deleteButtons[0];
    firstButton.click();
    expect(component.onDeleteClick).toHaveBeenCalledWith(inputAgencies[0].id);
  });

  it('should call onSaveClick on save button click', () => {
    spyOn(component, 'onSaveClick').and.callThrough(); // * spy the method
    const native = fixture.nativeElement;
    const saveButtons = native.querySelectorAll('form>button');
    const firstButton = saveButtons[0];
    firstButton.click();
    expect(component.onSaveClick).toHaveBeenCalledTimes(1);
  });
  it('should update agency name', () => {
    const native = fixture.nativeElement;
    const expectedName = 'SpaceX';
    fixture.detectChanges(); // * to update the template
    const nameInput = native.querySelector('input[name="name"]');
    nameInput.value = expectedName;
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // * to update the template
    expect(component.agency.name).toBe(expectedName);
  });

  it('should fill the option radios', () => {
    const debugEl = fixture.debugElement;
    component.agencyRanges = [
      { label: 'Interplanetary', value: 'Interplanetary' },
      { label: 'Orbital', value: 'Orbital' },
    ];
    component.agencyStatuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
    ];
    fixture.detectChanges(); // * to update the template
    const rangeRadios = debugEl.queryAll(By.css('input[name="range"]'));
    const statusRadios = debugEl.queryAll(By.css('input[name="status"]'));
    expect(rangeRadios.length).toBe(component.agencyRanges.length);
    expect(statusRadios.length).toBe(component.agencyStatuses.length);
  });
});
