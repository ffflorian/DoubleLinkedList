'use strict';

/**
 * Tests for double-linked list.
 *
 * Date: 2016-11-18
 * @author Florian Keller <github@floriankeller.de>
 */

const { ListElement, LinkedList } = require('../src/DoubleLinkedList');

describe('ListElement', () => {
    it('has a value', () => {
        const element = new ListElement('hello');
        expect(element.getValue()).toEqual('hello');
    });

    it('connects two elements', () => {
        const element1 = new ListElement('one');
        const element2 = new ListElement('two');
        element1.setNext(element2);
        expect(element1.getNext().getValue()).toEqual('two');
        element2.setPrev(element1);
        expect(element2.getPrev().getValue()).toEqual('one');
    });

    it('won\'t connect an invalid next element', () => {
        const element1 = new ListElement('one');
        expect(() => element1.setNext('error')).toThrow(new TypeError('Invalid next element!'));
    });

    it('won\'t connect an invalid previous element', () => {
        const element1 = new ListElement('one');
        expect(() => element1.setPrev('error')).toThrow(new TypeError('Invalid previous element!'));
    });

    it('won\'t accept an invalid value', () => {
        expect(() => new ListElement()).toThrow(new TypeError('Invalid value!'));
        expect(() => new ListElement(null)).toThrow(new TypeError('Invalid value!'));
        const element1 = new ListElement('');
        expect(() => element1.setValue()).toThrow(new TypeError('Invalid value!'));
        expect(() => element1.setValue(null)).toThrow(new TypeError('Invalid value!'));
    });
});

describe('LinkedList', () => {
    it('can add an element', () => {
        const list = new LinkedList();
        list.add('zero');
        list.add('one');
        list.add('two');
        list.add('three');
        expect(list.get(0)).toEqual('zero');
        expect(list.get(1)).toEqual('one');
        expect(list.get(2)).toEqual('two');
        expect(list.get(3)).toEqual('three');
    });

    it('can add an element at a certain index', () => {
        const list = new LinkedList();
        list.add('zero');
        list.add('one');
        list.add('three');
        list.add(2, 'two');
        expect(list.get(0)).toEqual('zero');
        expect(list.get(1)).toEqual('one');
        expect(list.get(2)).toEqual('two');
        expect(list.get(3)).toEqual('three');
    });

    it('won\'t find a non-existing element', () => {
        const list = new LinkedList();
        list.add('zero');
        list.add('one');
        list.add('two');
        expect(list.get(0)).toEqual('zero');
        expect(list.get(1)).toEqual('one');
        expect(list.get(2)).toEqual('two');
        expect(list.contains('error')).toBeNull();
    });

    it('won\'t go outside the list\'s bounds', () => {
        const list = new LinkedList();
        expect(() => list.get(0)).toThrow(new Error('Index 0 is out of bounds!'));
        list.add('zero');
        expect(() => list.get(2)).toThrow(new Error('Index 2 is out of bounds!'));
        expect(() => list.remove(2)).toThrow(new Error('Index 2 is out of bounds!'));
    });

    it('gets the list\'s head and tail', () => {
        const list = new LinkedList();
        list.add('zero');
        list.add('one');
        list.add('two');
        expect(list.getHead()).toEqual('zero');
        expect(list.getTail()).toEqual('two');
    });

    it('gets the correct index', () => {
        const list = new LinkedList();
        expect(list.indexOf('error')).toEqual(-1);
        list.add('zero');
        list.add('one');
        list.add('two');
        expect(list.indexOf('error')).toEqual(-1);
        expect(list.indexOf('one')).toEqual(1);
    });

    it('gets the correct size', () => {
        const list = new LinkedList();
        expect(list.getSize()).toEqual(0);
        list.add('zero');
        list.add('one');
        list.add('two');
        expect(list.getSize()).toEqual(3);
    });

    it('removes the correct element', () => {
        const list = new LinkedList();
        list.add('zero');
        list.add('one');
        list.add('two');
        list.add('three');
        list.remove(1);
        expect(list.get(1)).toEqual('two');
        list.remove('two');
        expect(list.get(1)).toEqual('three');
    });

    it('iterates with next over the list', () => {
        const list = new LinkedList();
        let iterator = list.iterator();
        list.add('zero');
        list.add('one');
        list.add('two');
        list.add('three');
        expect(iterator.next().value).toEqual('zero');
        expect(iterator.next().value).toEqual('one');
        expect(iterator.next().value).toEqual('two');
        expect(iterator.next().value).toEqual('three');
        expect(iterator.next().done).toEqual(true);
    });

    it('iterates with for over the list', () => {
        const list = new LinkedList();
        let str = '';
        list.add('zero');
        list.add('one');
        list.add('two');
        list.add('three');
        for (let element of list.iterator()) {
            str += element;
        }
        expect(str).toEqual('zeroonetwothree');
    });
});
