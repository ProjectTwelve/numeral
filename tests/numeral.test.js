const numeral = require('../src/numeral');

describe('numeral', () => {
    describe('token unit display', () => {
        it('xxx', () => {
            expect(numeral(1)).toEqual('1');
        });
    });
    describe('transfer unit display', () => {
        it('xxx', () => {
            expect(numeral(1)).toEqual('1');
        });
        it('xxx', () => {
            expect(numeral(203729)).toEqual('2.037k');
        });
    });
});
