import { TimeSpanPipe } from './time-span.pipe';

fdescribe('TimeSpanPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeSpanPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return _0d 0h_ for same start-end dates', () => {});
});
