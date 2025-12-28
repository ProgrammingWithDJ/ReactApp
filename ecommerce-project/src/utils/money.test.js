import {it, expect, describe} from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney', () => {

    it('formats 1999 cents as $19.99', () => {
   expect(formatMoney(1999)).toBe('$19.99'); 
});

it('displays 2 decimal places for whole dollars', () => {
    expect(formatMoney(5000)).toBe('$50.00');
});

it('formats 0 cents as $0.00', () => {
    expect(formatMoney(0)).toBe('$0.00');
});

it('formats 50 cents as $0.50', () => {
    expect(formatMoney(50)).toBe('$0.50');
});

 });

