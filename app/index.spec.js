import sumOne from './index';

describe('Basic test', () => {
  it('Should add one', () => {
    expect(sumOne(2)).to.equals(3);
  });
});
