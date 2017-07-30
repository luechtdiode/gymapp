import {flatMap, flatten} from './collection-util';

describe('the flatmap', () => {

    it('should map a monadic type to the outer type - simple case', () => {
        const monad1 = [1, 2, 3];
        const monad2 = [4, 5, 6];
        const outer = [monad1, monad2];

        const flattened = flatMap(outer, (monad) => monad);

        expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should map a monadic type to the outer type - type-extraction case', () => {
        const monad1 = {names: ['hans', 'joachim']};
        const monad2 = {names: ['mona', 'lisa']};
        const outer = [monad1, monad2];

        const flattened = flatMap(outer, (monad) => monad.names);

        expect(flattened).toEqual(['hans', 'joachim', 'mona', 'lisa']);
    });

    it('should flatten inner array-elements to outer array-elements', () => {
        const monad1 = [1, 2, 3];
        const monad2 = [4, 5, 6];
        const outer = [monad1, monad2];

        const flattened = flatten(outer);

        expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });

});
