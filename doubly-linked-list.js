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
    let pointer = this.first
    while (pointer !== null && pointer.data !== item) {
      pointer = pointer.next
    }
    return pointer
  }
}

module.exports = DoublyLinkedList
