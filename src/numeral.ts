import _numeral from 'numeral';
import Decimal from 'decimal.js-light';

enum NumeralType {
  GameCoin,
  Token,
  Transfer,
  Balance,
  USD,
}

const MAX = 10000000;
const MIN = 0.00000001;
const ONE = 1;

class Numeral {
  private readonly _raw: string;
  private readonly _num_abs: number;

  constructor(input: string) {
    this._raw = input;
    this._num_abs = Math.abs(Number(input));
  }

  /**
   * format token | coin | tx
   * @param {NumeralType} type
   * @param {number} decimalPlaces
   */
  format(type: NumeralType = NumeralType.Token, decimalPlaces?: number): string {
    if (this._num_abs === 0) return '0';
    if (type === NumeralType.Balance) {
      if (this._num_abs < ONE) {
        return new Decimal(this._raw).toDecimalPlaces(decimalPlaces ?? 6).toFixed();
      }
      return new Decimal(this._raw).toSignificantDigits(decimalPlaces ?? 7).toFixed();
    }
    if (type === NumeralType.USD) {
      if (this._num_abs < ONE) {
        const dec = new Decimal(this._raw).toDecimalPlaces(decimalPlaces ?? 4);
        return dec.eq(1) ? dec.toFixed(2) : dec.toFixed();
      }
      return new Decimal(this._raw).toFixed(decimalPlaces ?? 2);
    }
    if (type === NumeralType.Token || type === NumeralType.GameCoin) {
      if (this._num_abs < ONE) {
        if (this._num_abs < MIN) return '<' + MIN.toFixed(8);
        const formatInputString = decimalPlaces ? `0.[${''.padStart(decimalPlaces, '0')}]` : '0.[00000000]';
        return _numeral(this._raw).format(formatInputString);
      }
      const formatInputString = decimalPlaces ? `0.[${''.padStart(decimalPlaces, '0')}]a` : '0.[000]a';
      return _numeral(this._raw).format(formatInputString);
    }
    if (type === NumeralType.Transfer) {
      if (this._num_abs < ONE) {
        if (this._num_abs < MIN) return '<' + MIN.toFixed(8);
        return _numeral(this._raw).format('0.[00000000]');
      }
      if (this._num_abs < MAX) {
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
