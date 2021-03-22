import useClassNameManager from '../src/lib/useClassNameManager';
import {twCascade} from '@mariusmarais/tailwind-cascade';
import {twParse} from '../src/lib/functionHelpers';


describe('tailwindCascade', ()=>{
    it('takes an array of strings as inputs and returns a string with spaces removed except ', ()=>{
        expect(twCascade(['a','b','c'])).toBe('a b c');
    });
    it('cannot handle trailing or leading spaces in string items consistently',()=>{
    });
});

describe('twParse',()=>{
    it('splits the input string on every space but discards any space-only strings',()=>{
        expect(twParse`   a b  c  d  e   f     g    h   `).toMatchObject(['a','b','c','d','e','f','g','h']);        
    });
    it('ignores any passed in javascript entirely',()=>{
        expect(twParse`a ${'b'} ${returnC()} ${1} ${null} ${undefined} ${returnC} ${`oeu`}`)
            .toMatchObject(['a']);
    });
    it('returns an empty array if given empty string',()=>{
        expect(twParse``).toMatchObject([]);
    });
});
function returnC(){
    return `c`;
}
