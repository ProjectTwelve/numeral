import _numeral from 'numeral';
import Decimal from 'decimal.js-light';

enum NumeralType {
  GameCoin,
  Token,
  Transfer,
}

const MAX = 10000000;
const MIN = 0.00000001;
const ONE = 1;

class Numeral {
  private readonly _raw: string;
  private readonly _num_raw: number;

  constructor(input: string) {
    this._raw = input;
    this._num_raw = Number(input);
  }

  /**
   * format token | coin | tx
   * @param {NumeralType} type
   */
  format(type: NumeralType = NumeralType.Token): string {
    if (type === NumeralType.Token || type === NumeralType.GameCoin) {
      if (this._num_raw < ONE) {
        if (this._num_raw < MIN) return new Decimal(this._raw).todp(8).toFixed();
        return _numeral(this._raw).format('0.[00000000]');
      }
      return _numeral(this._raw).format('0.[000]a');
    }
    if (type === NumeralType.Transfer) {
      if (this._num_raw < ONE) {
        if (this._num_raw < MIN) {
          Decimal.set({ precision: 2, rounding: Decimal.ROUND_HALF_UP });
          return new Decimal(this._raw).toSignificantDigits(1).toFixed();
        }
        return _numeral(this._raw).format('0.[00000000]');
      }
      if (this._num_raw < MAX) {
        return new Decimal(this._raw).toSignificantDigits(8).toFixed();
      }
      return _numeral(this._raw).format('0');
    }
    return '0';
  }
}

/**
 * Attempt to parse the number, or return 0 if parsing fail
 * @param {string | number} input
 */
function parsedInput(input: string | number): string {
  if (typeof input === 'number') return input.toString();
  const value = Number(input);
  if (isNaN(value)) return '0';
  return input;
}

/**
 * numeral
 * only format is supported,
 * @param input
 */
function numeral(input: string | number): Numeral {
  return new Numeral(parsedInput(input));
}

export { numeral, parsedInput, NumeralType };
