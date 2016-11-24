'use strict';

import LinkedList from './LinkedList';

describe('LinkedList', () => {
    it ('can add an element', () => {
        const DLL = new LinkedList();
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        DLL.add('three');
        expect(DLL.get(0)).toEqual('zero');
        expect(DLL.get(1)).toEqual('one');
        expect(DLL.get(2)).toEqual('two');
        expect(DLL.get(3)).toEqual('three');
    });

    it ('can add an element at a certain index', () => {
        const DLL = new LinkedList();
        DLL.add('zero');
        DLL.add('one');
        DLL.add('three');
        DLL.add(2, 'two');
        expect(DLL.get(0)).toEqual('zero');
        expect(DLL.get(1)).toEqual('one');
        expect(DLL.get(2)).toEqual('two');
        expect(DLL.get(3)).toEqual('three');
    });

    it ('won\'t find a non-existing element', () => {
        const DLL = new LinkedList();
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        expect(DLL.get(0)).toEqual('zero');
        expect(DLL.get(1)).toEqual('one');
        expect(DLL.get(2)).toEqual('two');
        expect(DLL.contains('error')).toBeNull();
    });

    it ('won\'t go outside the list\'s bounds', () => {
        const DLL = new LinkedList();
        expect(() => DLL.get(0)).toThrow('Index 0 is out of bounds!');
        DLL.add('zero');
        expect(() => DLL.get(2)).toThrow('Index 2 is out of bounds!');
        expect(() => DLL.remove(2)).toThrow('Index 2 is out of bounds!');
    });

    it ('gets the list\'s head and tail', () => {
        const DLL = new LinkedList();
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        expect(DLL.getHead()).toEqual('zero');
        expect(DLL.getTail()).toEqual('two');
    });

    it ('gets the correct index', () => {
        const DLL = new LinkedList();
        expect(DLL.indexOf('error')).toEqual(-1);
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        expect(DLL.indexOf('error')).toEqual(-1);
        expect(DLL.indexOf('one')).toEqual(1);
    });

    it ('gets the correct size', () => {
        const DLL = new LinkedList();
        expect(DLL.getSize()).toEqual(0);
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        expect(DLL.getSize()).toEqual(3);
    });

    it ('removes the correct element', () => {
        const DLL = new LinkedList();
        DLL.add('zero');
        DLL.add('one');
        DLL.add('two');
        DLL.add('three');
        DLL.remove(1);
        expect(DLL.get(1)).toEqual('two');
        DLL.remove('two');
        expect(DLL.get(1)).toEqual('three');
    });
});
