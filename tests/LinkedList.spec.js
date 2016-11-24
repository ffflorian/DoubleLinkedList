'use strict';

import ListElement from './ListElement';

describe('ListElement', () => {
    it ('has a value', () => {
        const element = new ListElement('hello');
        expect(element.getValue()).toEqual('hello');
    });
    it ('connects two elements', () => {
        const element1 = new ListElement('one');
        const element2 = new ListElement('two');
        element1.setNext(element2);
        expect(element1.getNext().getValue()).toEqual('two');
        element2.setPrev(element1);
        expect(element2.getPrev().getValue()).toEqual('one');
    });
    it ('won\'t connect an invalid next element', () => {
        const element1 = new ListElement('one');
        expect(() => element1.setNext('error')).toThrow('Invalid next element!');
    });
    it ('won\'t connect an invalid previous element', () => {
        const element1 = new ListElement('one');
        expect(() => element1.setPrev('error')).toThrow('Invalid previous element!');
    });
    it ('won\'t accept an invalid value', () => {
        expect(() => new ListElement()).toThrow('Invalid value!');
        expect(() => new ListElement(null)).toThrow('Invalid value!');
        const element1 = new ListElement('');
        expect(() => element1.setValue()).toThrow('Invalid value!');
        expect(() => element1.setValue(null)).toThrow('Invalid value!');
    });
});
