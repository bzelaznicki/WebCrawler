import { expect, test } from 'vitest';
import { sortPages } from '../report';

test("Testing sorting few records", () => { 
    const input: Record<string, number> = {
        "example.com": 2,        
        "google.com": 45,
        "example.com/page3": 22,
    }
    const actual = sortPages(input);
    const expected: Record<string, number> = {
        "google.com": 45,
        "example.com/page3": 22,
        "example.com": 2,
    }
    expect(actual).toEqual(expected);
});

test("Sorting with all equal values", () => {
    const input: Record<string, number> = {
        "a.com": 1,
        "b.com": 1,
        "c.com": 1,
    };
    const actual = sortPages(input);
    expect(Object.values(actual)).toEqual([1, 1, 1]);
    expect(Object.keys(actual).sort()).toEqual(["a.com", "b.com", "c.com"].sort());
});

test("Sorting with negative and zero values", () => {
    const input: Record<string, number> = {
        "neg.com": -5,
        "zero.com": 0,
        "pos.com": 10,
    };
    const actual = sortPages(input);
    const expected: Record<string, number> = {
        "pos.com": 10,
        "zero.com": 0,
        "neg.com": -5,
    };
    expect(actual).toEqual(expected);
});

test("Sorting with empty input", () => {
    const input: Record<string, number> = {};
    const actual = sortPages(input);
    expect(actual).toEqual({});
});

test("Sorting with single entry", () => {
    const input: Record<string, number> = {
        "only.com": 7,
    };
    const actual = sortPages(input);
    const expected: Record<string, number> = {
        "only.com": 7,
    };
    expect(actual).toEqual(expected);
});