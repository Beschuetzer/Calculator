const evaluate = require('./calculate')

describe('evaluate', function () {
  it('simple addition', function () {
    expect(calculate('4+5')).toEqual('9');
  })
  it('simple subtraction', function () {
    expect(calculate('7-5')).toEqual('2');
  })
  it('simple multiplication', function () {
    expect(calculate('4*5')).toEqual('20');
  })
  it('simple division', function () {
    expect(calculate('4/2')).toEqual('2');
  })
  it('simple parenthesis /', function () {
    expect(calculate('(5+4)/3')).toEqual('3');
  })
  it('simple parenthesis *', function () {
    expect(calculate('(5+4)*3')).toEqual('27');
  })
  it('advanced expr no parenthesis', function () {
    expect(calculate('3*5+6-5/4+3')).toEqual('22.75');
  })
  it('advanced expr parenthesis', function () {
    expect(calculate('(3*5)+6-5/(7+3)')).toEqual('20.5');
  })
  it('advanced expr2 no parenthesis', function () {
    expect(calculate('3.5*5.6+6-5.1/4.4+3')).toEqual('27.440909091');
  })
  it('advanced expr2 parenthesis', function () {
    expect(calculate('(3-(4+6-5*2))+6-5.1/(4.2+3)')).toEqual('8.291666667');
  })
});
