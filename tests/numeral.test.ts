import { numeral } from '../src';

describe('numeral', () => {
  describe('token unit display', () => {
    test('xxx', () => {
      expect(numeral(1)).toEqual('1');
    });
  });
  describe('transfer unit display', () => {
    test('xxx', () => {
      expect(numeral(1)).toEqual('1');
    });
  });
});
