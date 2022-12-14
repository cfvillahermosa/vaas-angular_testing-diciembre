import { API_INITIAL_STATE } from '@models/api.interface';
import { of } from 'rxjs';
import { ApiStore } from './api.store';

// ! session 1
// ! Is an INTEGRATION test
// ! The BaseStore class is not mocked

type Trip = { destination: string; startDate: Date; price: number };
describe('The ApiStore ', () => {
  // * prefer well named types and variables with realistic values
  let tripsApiStore: ApiStore<Trip>;
  let trips: Trip[];
  describe('Wrapping the BaseStore ', () => {
    beforeEach(() => {
      // *  Arrange before each test
      tripsApiStore = new ApiStore<Trip>();
      trips = [
        {
          destination: 'The Moon',
          startDate: new Date('2023-02-23'),
          price: 100,
        },
      ];
    });
    // * be descriptive with test names
    it('should create an instance without arguments', () => {
      expect(tripsApiStore).toBeTruthy();
    });
    it('should have an initial state', () => {
      // *  Be descriptive with variable names
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState).toEqual(API_INITIAL_STATE);
      });
    });
    it('should set is working state to true', () => {
      // ToDo: student exercise
      tripsApiStore.setIsWorking();
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState.isWorking).toEqual(true);
      });
    });
    it('should set a trips array', () => {
      tripsApiStore.setData(trips);
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState.data).toEqual(trips);
      });
    });
    it('should add a new trip', () => {
      // ToDo: student exercise
      tripsApiStore.setData(trips);
      const newTrip = {
        destination: 'Mars',
        startDate: new Date('2024-02-24'),
        price: 200,
      };
      tripsApiStore.addItem(newTrip);
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        const expected = [...trips, newTrip];
        expect(tripsApiState.data).toEqual(expected);
      });
    });
  });
});

describe('Spying the BaseStore dependency use', () => {
  let tripsApiStore: ApiStore<Trip>;
  let baseStoreSpy: any;
  beforeEach(() => {
    tripsApiStore = new ApiStore();
    baseStoreSpy = jasmine.createSpyObj('BaseStore', ['setState']);
    tripsApiStore['baseStore'] = baseStoreSpy;
  });
  it('should call setState correctly when setIsWorking', () => {
    tripsApiStore.setIsWorking();
    expect(baseStoreSpy.setState).toHaveBeenCalledOnceWith({
      isWorking: true,
      error: '',
    });
  });
});

fdescribe('Stubbing the BaseStore dependency use', () => {
  it('should return an observable with initial state whe call select$', () => {
    const tripsApiStore = new ApiStore<Trip>();
    const baseStoreStub = jasmine.createSpyObj('BaseStore', ['select$']);
    baseStoreStub.select$ = jasmine
      .createSpy()
      .and.returnValue(of(API_INITIAL_STATE));
    tripsApiStore['baseStore'] = baseStoreStub;
    tripsApiStore.selectState$().subscribe((tripsApiState) => {
      expect(tripsApiState).toEqual(API_INITIAL_STATE);
    });
  });
});
