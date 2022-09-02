import { numeral, parseInput } from '../src';

describe('parseInput', () => {
    it('parse number', () => {
       expect(parseInput(1)).toBe('1');
       expect(parseInput(2)).toBe('2');
       expect(parseInput(1.5)).toBe('1.5');
       expect(parseInput(2.0)).toBe('2');
       expect(parseInput(0.99)).toBe('0.99');
       expect(parseInput(-1)).toBe('-1');
       expect(parseInput(-0.5)).toBe('-0.5');
    });
    it('parse string', () => {
        expect(parseInput('1')).toBe('1');
        expect(parseInput('1.0')).toBe('1');
        expect(parseInput('1.')).toBe('1');
        expect(parseInput('0.666')).toBe('0.666');
        expect(parseInput('-0.666')).toBe('-0.666');
        // parse error
        expect(parseInput('-abc')).toBe('0');
    });
});

describe('numeral', () => {
  describe('gamecoin unit display', () => {
      describe('no greater than 10000', () => {
          it('one int digit display as input', () => {
              expect(numeral(0)).toEqual('0');
          });
          it('three int digits display as input', () => {
              expect(numeral(873)).toEqual('873');
          })
      });
      describe('unit K display', () => {
          // it('min edge value',() => {
          //     expect(numeral(10000)).toEqual('10K');
          // });
          // it('max edge value',() => {
          //     expect(numeral()).toEqual('');
          // })
          it('two int digits', () => {
              expect(numeral('10001')).toEqual('10.001K');
          });
          it('three int digits', () => {
              expect(numeral('700010')).toEqual('700.01K');
          });
      });
      describe('unit M display', () => {
          // it('min edge value',() => {
          //     expect(numeral(10000)).toEqual('10K');
          // });
          // it('max edge value',() => {
          //     expect(numeral()).toEqual('');
          // })
          it('round up one int digit', () => {
              expect(numeral('1230745')).toEqual('1.231M');
          });
          it('round down two int digits', () => {
              expect(numeral('12082292')).toEqual('12.082M');
          });
          it('cut zero two int digits', () => {
              expect(numeral('12020291')).toEqual('12.02M');
          });
          it('round up two int digits', () => {
              expect(numeral('12300900')).toEqual("12.301M");
          })
          it('cut zero three int digits', () => {
              expect(numeral('123000400')).toEqual('123M');
          });
      });
      describe('unit B display', () => {
          it('round up one int digit', () => {
              expect(numeral('1000508000')).toEqual('1.001B');
          });
          it('round down two int digits', () => {
              expect(numeral('12340122000')).toEqual('12.34B');
          });
          it('cut zero three int digits', () => {
              expect(numeral('123400000000')).toEqual('123.4B');
          });
      });
      describe('unit T display', () => {
          it('round up one int digit', () => {
              expect(numeral('1293792000000')).toEqual('1.294T');
          });
          it('round down two int digits', () => {
              expect(numeral('79760008000000')).toEqual('79.76T');
          });
          it('normal three int digits', () => {
              expect(numeral('220200892102001')).toEqual('220.201T');
          });
      });
  });
  describe('token unit display', () => {
      describe('no greater than 0', () => {
          it('display as input', () => {
              expect(numeral('0.12837784')).toEqual('0.12837784');
          });
          it('round down eight decimal', () => {
              expect(numeral('0.000864901')).toEqual('0.0008649');
          });
          it('round up eight decimal cut zero', () => {
              expect(numeral('0.000864909')).toEqual('0.00086491');
          });
          it('round up eight decimal', () => {
              expect(numeral('0.008600889')).toEqual('0.00860089');
          });
          it('two small', () => {
              expect(numeral('0.00000000183749')).toEqual('0');
          });
          it('round up eight decimal', () => {
              expect(numeral('0.00000000783749')).toEqual('0.00000001');
          });
          it('cut zero eight decimal', () => {
              expect(numeral('0.0008000000008786')).toEqual('0.0008');
          });
          // it('', () => {
          //     expect(numeral()).toEqual('');
          // });
          // it('', () => {
          //     expect(numeral()).toEqual('');
          // });
          // it('', () => {
          //     expect(numeral()).toEqual('');
          // });
      })

  });
  describe('transfer unit display', () => {
      it('xxx', () => {
          expect(numeral(1)).toEqual('1');
      });
  });
});
