import { numeral, NumeralType, parsedInput } from '../src';

describe('parsedInput', () => {
  it('parse number', () => {
    expect(parsedInput(1)).toBe('1');
    expect(parsedInput(2)).toBe('2');
    expect(parsedInput(1.5)).toBe('1.5');
    expect(parsedInput(2.0)).toBe('2');
    expect(parsedInput(0.99)).toBe('0.99');
    expect(parsedInput(-1)).toBe('-1');
    expect(parsedInput(-0.5)).toBe('-0.5');
  });
  it('parse string', () => {
    expect(parsedInput('1')).toBe('1');
    expect(parsedInput('1.0')).toBe('1.0');
    expect(parsedInput('0.666')).toBe('0.666');
    expect(parsedInput('-0.666')).toBe('-0.666');
    // parse error
    expect(parsedInput('-abc')).toBe('0');
  });
});

describe('numeral', () => {
  describe('gameCoin unit display', () => {
    describe('no greater than 1000', () => {
      it('one int digit display as input', () => {
        expect(numeral(0).format(NumeralType.GameCoin)).toEqual('0');
      });
      it('three int digits display as input', () => {
        expect(numeral(873).format(NumeralType.GameCoin)).toEqual('873');
      });
    });

    describe('unit K display', () => {
      it('one int digits', () => {
        expect(numeral('1028').format(NumeralType.GameCoin)).toEqual('1.028k');
      });
      it('two int digits', () => {
        expect(numeral('10001').format(NumeralType.GameCoin)).toEqual('10.001k');
      });
      it('three int digits', () => {
        expect(numeral('700010').format(NumeralType.GameCoin)).toEqual('700.01k');
      });
    });

    describe('unit M display', () => {
      it('round up one int digit', () => {
        expect(numeral('1230745').format(NumeralType.GameCoin)).toEqual('1.231m');
      });
      it('round down two int digits', () => {
        expect(numeral('12082292').format(NumeralType.GameCoin)).toEqual('12.082m');
      });
      it('cut zero two int digits', () => {
        expect(numeral('12020291').format(NumeralType.GameCoin)).toEqual('12.02m');
      });
      it('round up two int digits', () => {
        expect(numeral('12300900').format(NumeralType.GameCoin)).toEqual('12.301m');
      });
      it('cut zero three int digits', () => {
        expect(numeral('123000400').format(NumeralType.GameCoin)).toEqual('123m');
      });
    });

    describe('unit B display', () => {
      it('round up one int digit', () => {
        expect(numeral('1000508000').format(NumeralType.GameCoin)).toEqual('1.001b');
      });
      it('round down two int digits', () => {
        expect(numeral('12340122000').format(NumeralType.GameCoin)).toEqual('12.34b');
      });
      it('cut zero three int digits', () => {
        expect(numeral('123400000000').format(NumeralType.GameCoin)).toEqual('123.4b');
      });
    });

    describe('unit T display', () => {
      it('round up one int digit', () => {
        expect(numeral('1293792000000').format(NumeralType.GameCoin)).toEqual('1.294t');
      });
      it('round down two int digits', () => {
        expect(numeral('79760008000000').format(NumeralType.GameCoin)).toEqual('79.76t');
      });
      it('normal three int digits', () => {
        expect(numeral('220200892102001').format(NumeralType.GameCoin)).toEqual('220.201t');
      });
    });
  });

  describe('token unit display', () => {
    describe('no greater than 1', () => {
      it('display as input', () => {
        expect(numeral('0.12837784').format(NumeralType.Token)).toEqual('0.12837784');
      });
      it('round down eight decimal', () => {
        expect(numeral('0.000864901').format(NumeralType.Token)).toEqual('0.0008649');
      });
      it('round up eight decimal cut zero', () => {
        expect(numeral('0.000864909').format(NumeralType.Token)).toEqual('0.00086491');
      });
      it('round up eight decimal', () => {
        expect(numeral('0.008600889').format(NumeralType.Token)).toEqual('0.00860089');
      });
      it('two small', () => {
        expect(numeral('0.00000000183749').format(NumeralType.Token)).toEqual('0');
      });
      it('round up eight decimal', () => {
        expect(numeral('0.00000000783749').format(NumeralType.Token)).toBe('0.00000001');
      });
      it('cut zero eight decimal', () => {
        expect(numeral('0.0008000000008786').format(NumeralType.Token)).toEqual('0.0008');
      });
    });

    describe('no greater than 1000', () => {
      it('round up one int digit', () => {
        expect(numeral('1.9807543').format(NumeralType.Token)).toEqual('1.981');
      });
      it('round down two int digits', () => {
        expect(numeral('18.92010001').format(NumeralType.Token)).toEqual('18.92');
      });
      it('round up three int digits', () => {
        expect(numeral('283.923790').format(NumeralType.Token)).toEqual('283.924');
      });
    });

    describe('unit K displat', () => {
      it('round down one int digit', () => {
        expect(numeral('4710.0100002').format(NumeralType.Token)).toEqual('4.71k');
      });
      it('round up two int digits', () => {
        expect(numeral('92001.709821').format(NumeralType.Token)).toEqual('92.002k');
      });
      it('round down three in digits', () => {
        expect(numeral('245075.1008').format(NumeralType.Token)).toEqual('245.075k');
      });
      it('round down cut zero', () => {
        expect(numeral('200000.8292').format(NumeralType.Token)).toEqual('200.001k');
      });
      it('round down cut zero', () => {
        expect(numeral('200000.2292').format(NumeralType.Token)).toEqual('200k');
      });
    });

    describe('unit M displat', () => {
      it('round down one int digit', () => {
        expect(numeral('1293092.2837').format(NumeralType.Token)).toEqual('1.293m');
      });
      it('round up two int digits', () => {
        expect(numeral('82029720.0003927').format(NumeralType.Token)).toEqual('82.03m');
      });
      it('round down three in digits', () => {
        expect(numeral('182938222.98281').format(NumeralType.Token)).toEqual('182.938m');
      });
      it('round down cut zero', () => {
        expect(numeral('200000000.8292').format(NumeralType.Token)).toEqual('200m');
      });
      it('round down cut zero', () => {
        expect(numeral('200000000.2292').format(NumeralType.Token)).toEqual('200m');
      });
    });

    describe('unit B displat', () => {
      it('round up one int digit', () => {
        expect(numeral('1283992333.282730').format(NumeralType.Token)).toEqual('1.284b');
      });
      it('round down two int digits', () => {
        expect(numeral('82932000293.2028').format(NumeralType.Token)).toEqual('82.932b');
      });
      it('round down cut zero three in digits', () => {
        expect(numeral('192000000283.9382').format(NumeralType.Token)).toEqual('192b');
      });
    });

    describe('unit T displat', () => {
      it('round down cut zero one int digit', () => {
        expect(numeral('8100100000383.23081').format(NumeralType.Token)).toEqual('8.1t');
      });
      it('round down two int digits', () => {
        expect(numeral('12978020000839.89192').format(NumeralType.Token)).toEqual('12.978t');
      });
      it('round down three in digits', () => {
        expect(numeral('220130000000000.10192').format(NumeralType.Token)).toEqual('220.13t');
      });
    });

    describe('add decimal places', () => {
      it('display as input', () => {
        expect(numeral('0.12837784').format(NumeralType.Token, 2)).toEqual('0.13');
      });
      it('round up one int digit', () => {
        expect(numeral('1.9807543').format(NumeralType.Token, 3)).toEqual('1.981');
      });
      it('round down one int digit', () => {
        expect(numeral('4710.0100002').format(NumeralType.Token, 1)).toEqual('4.7k');
      });
    });
  });

  describe('transfer unit display', () => {
    describe('no greater than 1', () => {
      it('round down', () => {
        expect(numeral('0.937839292').format(NumeralType.Transfer)).toEqual('0.93783929');
      });
      it('round up', () => {
        expect(numeral('0.000281448').format(NumeralType.Transfer)).toEqual('0.00028145');
      });
      it('cut zero', () => {
        expect(numeral('0.00060000').format(NumeralType.Transfer)).toEqual('0.0006');
      });
      it('first effect digit', () => {
        expect(numeral('0.000000001928').format(NumeralType.Transfer)).toEqual('0.000000002');
      });
    });

    describe('normal total eight digits', () => {
      it('display init', () => {
        expect(numeral('23.973628').format(NumeralType.Transfer)).toEqual('23.973628');
      });
      it('round down total eight digits', () => {
        expect(numeral('8798.087533908').format(NumeralType.Transfer)).toEqual('8798.0875');
      });
      it('round down total eight digits', () => {
        expect(numeral('100003.290383').format(NumeralType.Transfer)).toEqual('100003.29');
      });
      it('round up total eight digits', () => {
        expect(numeral('19200093.92910').format(NumeralType.Transfer)).toEqual('19200094');
      });
      it('round down cut decimal', () => {
        expect(numeral('20394374882.012837').format(NumeralType.Transfer)).toEqual('20394374882');
      });
    });
  });


  describe('p12 token unit display', () => {
    describe('greater than 1', () => {
      it('directly diplay total 7 digits', () => {
        expect(numeral('1.234567').format(NumeralType.Transfer)).toEqual('1.234567');
      });
      it('round up total 7 digits', () => {
        expect(numeral('2389.392501').format(NumeralType.Transfer)).toEqual('2389.393');
      });
      it('round down total 7 digits', () => {
        expect(numeral('117.392341').format(NumeralType.Transfer)).toEqual('117.3923');
      });
      it('round up cut zero', () => {
        expect(numeral('7.3999999999').format(NumeralType.Transfer)).toEqual('7.4');
      });
    })
    describe('no greater than 1', () => {
      it('max 6 decimal round up', () => {
        expect(numeral('0.0000009').format(NumeralType.Transfer)).toEqual('0.000001');
      });
      it('max 6 decimal round down', () => {
        expect(numeral('0.0000004').format(NumeralType.Transfer)).toEqual('0');
      });
      it('ngt 0.0000004 cut to zero', () => {
        expect(numeral('0.00000009203782').format(NumeralType.Transfer)).toEqual('0');
      });
      it('round up', () => {
        expect(numeral('0.008992876').format(NumeralType.Transfer)).toEqual('0.008993');
      });
      it('round down', () => {
        expect(numeral('0.003422311').format(NumeralType.Transfer)).toEqual('0.003422');
      });
      it('round up cut zero', () => {
        expect(numeral('0.0000995').format(NumeralType.Transfer)).toEqual('0.0001');
      });
    })

  });

  describe('usd(cash) unit display', () => {
    describe('greater than 1, directly display integer and always keep 2 decimal', () => {
      it('round up', () => {
        expect(numeral('117.392341').format(NumeralType.Transfer)).toEqual('117.39');
      });
      it('round down', () => {
        expect(numeral('1899.03211').format(NumeralType.Transfer)).toEqual('1899.03');
      });
      it('round up cut zero', () => {
        expect(numeral('1898.995').format(NumeralType.Transfer)).toEqual('1899.00');
      });
      it('round up more digits (btc)', () => {
        expect(numeral('16400.579203').format(NumeralType.Transfer)).toEqual('16400.58');
      });

    })
    describe('no greater than 1', () => {
      it('max 4 decimal round up', () => {
        expect(numeral('0.00005').format(NumeralType.Transfer)).toEqual('0.0001');
      });
      it('max 4 decimal round down', () => {
        expect(numeral('0.00004').format(NumeralType.Transfer)).toEqual('0');
      });
      it('ngt 0.00004 cut to zero', () => {
        expect(numeral('0.000001214').format(NumeralType.Transfer)).toEqual('0');
      });
      it('round up', () => {
        expect(numeral('0.008172876').format(NumeralType.Transfer)).toEqual('0.0082');
      });
      it('round down', () => {
        expect(numeral('0.11033024889').format(NumeralType.Transfer)).toEqual('0.1103');
      });
      it('round up cut zero', () => {
        expect(numeral('0.379989001').format(NumeralType.Transfer)).toEqual('0.38');
      });
      it('round up cut zero to 1', () => {
        expect(numeral('0.99995').format(NumeralType.Transfer)).toEqual('1.00');
      });
    })

  });

  it('other', () => {
    expect(numeral('123').format(5)).toEqual('0');
  });
});
