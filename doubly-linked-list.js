class DoublyLinkedList {
  constructor(items) {
    this.first = null
    this.length = 0
    if (items) {
      items.forEach(item => this.append(item))
    }
  }

  /**
   * Internal method used initialze
   * an empty list. Used by append and prepend
   * @param {*} item 
   */
  _init(item) {
    this.length++
    this.first = {
      data: item,
      prev: null,
      next: null,
    }
    this.last = this.first
    return this.first
  }

  append(item) {
    // Empty list
    if (this.length === 0) {
      return this._init(item)
    } else {
      const last = this.last
      this.last = {
        data: item,
        next: null,
        prev: last,
      }
      last.next = this.last
      this.length++
      return this.last
    }
  }

  prepend(item) {
    if (this.length === 0) {
      return this._init(item)
    } else {
      const first = this.first
      this.first = {
        data: item,
        next: first,
        prev: null,
      }
      first.prev = this.first
      this.length++
      return this.first
    }
  }

  remove(item) {
    const node = this.search(item)
    if (node === null) {
      return false
    }
    if (node === this.first) {
      this.first = node.next
    }
    if (node === this.last) {
      this.last = node.prev
    }
    if (node.prev !== null) {
      node.prev.next = node.next
    }
    if (node.next !== null) {
      node.next.prev = node.prev
    }
    node.prev = null
    node.next = null
    node.data = null
    this.length--
    return true
  }

  search(item) {
    /**
     * We maintain pointers to the first and last item,
     * which means we do search in n/2 time
     */
    let head = this.first
    let tail = this.last
    /**
     * Traverse the list from both ends until either:
     * 1. The head pointer contains the data
     * 2. The tail pointer contains the data
     * 3. The head and tail are equal, meaining that
     *    we've traversed the whole list
     */
    while (head.data !== item && tail.data !== item && head !== tail) {
      head = head.next
      tail = tail.prev
    }
    if (head.data === item) {
      return head
    }
    if (tail.data === item) {
      return tail
    }
    return null
  }
}

module.exports = DoublyLinkedList
