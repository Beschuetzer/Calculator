const evaluate = require('./evaluate')

describe('evaluate', function () {
  it('simple addition', function () {
    expect(evaluate('4+5')).toEqual('9');
  })
  it('simple subtraction', function () {
    expect(evaluate('7-5')).toEqual('2');
  })
  it('simple multiplication', function () {
    expect(evaluate('4*5')).toEqual('20');
  })
  it('simple division', function () {
    expect(evaluate('4/2')).toEqual('2');
  })
  it('simple parenthesis /', function () {
    expect(evaluate('(5+4)/3')).toEqual('3');
  })
  it('simple parenthesis *', function () {
    expect(evaluate('(5+4)*3')).toEqual('27');
  })
  it('advanced expr no parenthesis', function () {
    expect(evaluate('3*5+6-5/4+3')).toEqual('22.75');
  })
  it('advanced expr2 no parenthesis', function () {
    expect(evaluate('5−6×2^3−5×6')).toEqual('-73');
  })
  it('advanced expr3 no parenthesis', function () {
    expect(evaluate('3.5*5.6+6-5.1/4.4+3')).toEqual('27.440909091');
  })

  it('advanced expr parenthesis', function () {
    expect(evaluate('(3*5)+6-5/(7+3)')).toEqual('20.5');
  })

  it('advanced expr2 parenthesis', function () {
    expect(evaluate('(3-(4+6-5*2))+6-5.1/(4.2+3)')).toEqual('8.291666667');
  })
});
