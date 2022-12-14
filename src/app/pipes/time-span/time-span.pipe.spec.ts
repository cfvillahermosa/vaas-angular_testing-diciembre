import { TimeSpanPipe } from './time-span.pipe';

// ! session 3
// ! Extracting domain logic from angular artifacts

describe('TimeSpanPipe', () => {
  let pipe: any;
  let input: any;
  beforeEach(() => {
    pipe = new TimeSpanPipe();
    input = {
      start: new Date(2022, 1, 1),
      end: new Date(2022, 1, 1),
    };
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  // it('should return _0d 0h_ for same start-end dates', () => {
  //   expect(pipe.transform(input)).toEqual('0d 0h ');
  // });
  it('should call the calculateTimeSpan function correctly', () => {
    const spy = spyOn(pipe, 'calculateTimeSpan').and.returnValue('');
    pipe.transform(input);
    expect(spy).toHaveBeenCalled();
  });
  it('should call not the calculateTimeSpan function when no value', () => {
    const spy = spyOn(pipe, 'calculateTimeSpan');
    pipe.transform();
    expect(spy).toHaveBeenCalledTimes(0);
  });
  it('should return the calculateTimeSpan result in lowercase pad-left', () => {
    const input = ' VASS';
    spyOn(pipe, 'calculateTimeSpan').and.returnValue(input);
    const actual = pipe.transform(input);
    expect(actual).toEqual('vass');
    // const expected = input.toLowerCase().trimStart(); no se debe meter implementación en test
  });
});
