class Numeral {
  private readonly _raw: string;

  constructor(input: string) {
    this._raw = input;
  }

  format(): string {
    return this._raw;
  }
}

/**
 * Attempt to parse the number, or return 0 if parsing fail
 * @param {string | number} input
 */
function parseInput(input: string | number) {
  if (typeof input === 'number') return input.toString();
  const value = Number(input);
  if (isNaN(value)) return '0';
  return value.toString();
}

/**
 * numeral
 * only format is supported,
 * @param input
 */
function numeral(input: string | number): Numeral {
  return new Numeral(parseInput(input));
}

export { numeral, parseInput };
