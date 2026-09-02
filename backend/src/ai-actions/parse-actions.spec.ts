import { parseActions } from './parse-actions';

const action = {
  title: 'Rever glicemia',
  reason: 'Valor alto',
  recommendation: 'Pedir jejum',
};

describe('parseActions', () => {
  it('reads the actions array from the payload', () => {
    expect(parseActions({ actions: [action, action, action] })).toHaveLength(3);
  });

  it('drops incomplete rows and caps at 5', () => {
    const rows = [
      action,
      { title: 'x', reason: '', recommendation: 'y' },
      action,
      action,
      action,
      action,
      action,
    ];

    expect(parseActions({ actions: rows })).toHaveLength(5);
  });

  it('returns an empty list when the payload is not a list', () => {
    expect(parseActions({ oops: true })).toEqual([]);
  });
});
