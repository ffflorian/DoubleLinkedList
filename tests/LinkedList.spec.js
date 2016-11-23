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
});
