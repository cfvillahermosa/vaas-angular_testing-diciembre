import { API_INITIAL_STATE } from '@models/api.interface';
import { ApiStore } from './api.store';

// * Is an INTEGRATION test
// * The BaseStore class is not mocked

describe('The ApiStore ', () => {
  // * prefer well named types and variables with realistic values
  type Trip = { destination: string; startDate: Date; price: number };
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
      expect(new ApiStore<Trip>()).toBeTruthy();
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
