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
      describe('no greater than 1000', () => {
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
          it('one int digits', () => {
            expect(numeral('1028')).toEqual('1.028K');
          });
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
      describe('no greater than 1', () => {
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
      });
      describe('no greater than 1000', () => {
        it('round up one int digit', () => {
          expect(numeral('1.9807543')).toEqual('1.981');
        });
        it('round down two int digits', () => {
            expect(numeral('18.92010001')).toEqual('19.92');
        });
        it('round up three int digits', () => {
            expect(numeral('283.923790')).toEqual('283.924');
        });
      });
      describe('unit K displat', () => {
        it('round down one int digit', () => {
          expect(numeral('4710.0100002')).toEqual('4.71K');
        });
        it('round up two int digits', () => {
          expect(numeral('92001.709821')).toEqual('92.002K');
        });
        it('round down three in digits', () => {
          expect(numeral('245075.1008')).toEqual('245.075K');
        });
        it('round down cut zero', () => {
          expect(numeral('200000.8292')).toEqual('200K');
        });

      });
      describe('unit M displat', () => {
        it('round down one int digit', () => {
          expect(numeral('1293092.2837')).toEqual('1.293M');
        });
        it('round up two int digits', () => {
          expect(numeral('82029720.0003927')).toEqual('82.03M');
        });
        it('round down three in digits', () => {
          expect(numeral('182938222.98281')).toEqual('182.938M');
        });
        it('round down cut zero', () => {
          expect(numeral('200000.8292')).toEqual('200K');
        });
      });
      describe('unit B displat', () => {
        it('round up one int digit', () => {
          expect(numeral('1283992333.282730')).toEqual('1.284B');
        });
        it('round down two int digits', () => {
          expect(numeral('82932000293.2028')).toEqual('82.932B');
        });
        it('round down cut zero three in digits', () => {
          expect(numeral('192000000283.9382')).toEqual('192B');
        });
      });
      describe('unit T displat', () => {
        it('round down cut zero one int digit', () => {
          expect(numeral('8100100000383.23081')).toEqual('8.1T');
        });
        it('round down two int digits', () => {
          expect(numeral('12978020000839.89192')).toEqual('12.978T');
        });
        it('round down three in digits', () => {
          expect(numeral('220130000000000.10192')).toEqual('220.13T');
        });
      });
  });
  describe('transfer unit display', () => {
    describe('no greater than 1', () => {
      it('round down', () => {
        expect(numeral("0.937839292")).toEqual("0.93783929");
      });
      it('round up', () => {
        expect(numeral("0.000281448")).toEqual("0.00028145");
      });
      it('cut zero', () => {
        expect(numeral("0.00060000")).toEqual("0.0006");
      });
      it('first effect digit', () => {
        expect(numeral("0.000000001928")).toEqual("0.000000002");
      });
    });
    describe('normal total eight digits', () => {
      it('display init', () => {
        expect(numeral("23.973628")).toEqual("23.973628");
      });
      it('round down total eight digits', () => {
        expect(numeral("8798.087533908")).toEqual("8798.0875");
      });
      it('round down total eight digits', () => {
        expect(numeral("100003.290383")).toEqual("100003.29");
      });
      it('round up total eight digits', () => {
        expect(numeral("19200093.92910")).toEqual("19200094");
      });
      it('round down cut decimal', () => {
        expect(numeral("20394374882.012837")).toEqual("20394374882");
      });
    });
  });
});
