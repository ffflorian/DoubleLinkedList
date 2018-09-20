/**
 * A single element in a double-linked list.
 *
 * Date: 2016-11-18
 * @author Florian Keller <github@floriankeller.de>
 */

export type ListElementValue = string | number | object;

/**
 * A list element. By default the head and the tail are set to `null` since they don't exist yet.
 * @param value The value to set.
 */
export class ListElement {
  private prev: ListElement | null;
  private next: ListElement | null;

  constructor(private value: ListElementValue) {
    if (value === null || typeof value === 'undefined') {
      throw new TypeError('Invalid value.');
    }

    /**
     * The previous element.
     *  _______    _______
     * |*|**|*|   | |  | |
     * |*|**|*<---- |  | |
     * |_|__|_|   |_|__|_|
     * previous   current
     */
    this.prev = null;

    /**
     * The next element.
     *  _______    _______
     * | |  | |   |*|**|*|
     * | |  | ---->*|**|*|
     * |_|__|_|   |_|__|_|
     * current      next
     */
    this.next = null;

    /**
     * The value which the element should contain.
     */
    this.value = value;
  }

  /** Returns the next element. `null` otherwise. */
  getNext(): ListElement | null {
    return this.next;
  }

  /** Returns the previous element. `null` otherwise. */
  getPrev(): ListElement | null {
    return this.prev;
  }

  /** Returns the value. */
  getValue() {
    return this.value;
  }

  /**
   * Sets the next element.
   * @param next The element to set.
   * @throws `TypeError` when `next` is not a ListElement
   */
  setNext(next: ListElement): void {
    if (!(next instanceof ListElement)) {
      throw new TypeError('Invalid next element.');
    }
    this.next = next;
  }

  /**
   * Sets the previous element.
   * @param prev The previous element to set.
   * @throws `TypeError` when `prev` is `null` or `undefined`
   */
  setPrev(prev: ListElement): void {
    if (!(prev instanceof ListElement)) {
      throw new TypeError('Invalid previous element.');
    }
    this.prev = prev;
  }

  /**
   * Sets the value.
   * @param value The value to set.
   * @throws `TypeError` When `value` is `null` or `undefined`
   */
  setValue(value: ListElementValue): void {
    if (value === null || typeof value === 'undefined') {
      throw new TypeError('Invalid value.');
    }
    this.value = value;
  }

  /** Returns the value readable and enclosed by array-like brackets. */
  toString(): string {
    return `[ ${this.getValue()} ]`;
  }
}
