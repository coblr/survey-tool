import * as Time from './Time';
import moment from 'moment';

describe('Time Helper', () => {
  describe('getReadableTime() Method', () => {
    it('generates a human readable representation containing only seconds', () => {
      const timeData = moment.duration(59, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('59s');
    });
    it('generates a human readable representation of exactly 1 minute', () => {
      const timeData = moment.duration(60, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1m');
    });
    it('generates a human readable representation containing only minutes and seconds', () => {
      const timeData = moment.duration(3599, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('59m 59s');
    });
    it('generates a human readable representation of exactly 1 hour', () => {
      const timeData = moment.duration(3600, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1h');
    });
    it('generates a human readable representation containing only hours, minutes and seconds', () => {
      const timeData = moment.duration(86399, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('23h 59m 59s');
    });
    it('generates a human readable representation of exactly 1 day', () => {
      const timeData = moment.duration(86400, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1d');
    });
    it('generates a human readable representation containing days, hours, minutes and seconds', () => {
      const timeData = moment.duration(172799, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1d 23h 59m 59s');
    });
    it('generates a human readable representation containing days and seconds', () => {
      const timeData = moment.duration(86459, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1d 59s');
    });
    it('generates a human readable representation containing days and minutes', () => {
      const timeData = moment.duration(89940, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1d 59m');
    });
    it('generates a human readable representation containing days and hours', () => {
      const timeData = moment.duration(169200, 'seconds');
      const readableTime = Time.getReadableTime(timeData);
      expect(readableTime).toBe('1d 23h');
    });
  });
});
