import { BaseStore } from './base.store';

fdescribe('The BaseStore class', () => {
  const initialState = {
    destination: 'The Moon',
    startDate: new Date('2023-02-23'),
    price: 100,
  };

  it('should create an instance', () => {
    expect(new BaseStore(null)).toBeTruthy();
  });

  it('should instantiate with initial state ', () => {
    // Arrange
    const input = initialState;
    // Act
    const sut = new BaseStore(input);
    // Assert
    expect(sut).toBeTruthy();
  });

  it('should return a different instance with the same initial state', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2023-02-23'),
      price: 100,
    };
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
  });
});
