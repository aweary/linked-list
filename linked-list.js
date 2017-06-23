class LinkedList {
  constructor(items) {
    this.head = null
    this.last = this.head
    this.length = 0
    if (items) {
      items.forEach(item => this.append(item))
    }
  }

  append(item) {
    // Null head means the list is empty
    if (this.head === null) {
      this.head = {
        data: item,
        next: null,
      }
      this.last = this.head
    } else {
      // Otherwise, append to the end of the list
      const last = this.last
      const node = {
        data: item,
        next: null,
      }
      last.next = node
      this.last = node
    }
    this.length++
  }

  prepend(item) {
    // Null head means the list is empty
    if (this.head === null) {
      this.head = {
        data: item,
        next: null,
      }
      this.last = this.head
    }
    const head = this.head
    this.head = {
      data: item,
      next: head,
    }
    this.length++
  }

  /**
   * Removes a node from the linked list.
   * Returns true if the removal is successful,
   * false if it fails. Removal can fail if the list is
   * empty, or the item doesn't exist in the list.
   * @param {*} item 
   * @returns {boolean}
   */
  remove(item) {
    if (this.length === 0) {
      return false
    }
    // If the head is the item to remove, slice it up
    if (this.head.data === item) {
      if (this.length === 1) {
        this.head = null
        this.last = null
      } else {
        this.head = this.head.next
      }
      // TODO handle lists with one element
      this.length--
      return true
    }
    let pointer = this.head
    while (pointer !== null) {
      if (pointer.next && pointer.next.data === item) {
        break
      }
      pointer = pointer.next
    }
    // If the pointer is null, the item doesn't exist in the list
    if (pointer === null) {
      return false
    }
    // The target is the item being deleted
    const target = pointer.next
    // Cut out the element by updating the previous node's pointer
    pointer.next = target.next
    // If the target was the last item, the pointer takes it place
    if (this.last === target) {
      this.last = pointer
    }
    // Nullify reference to next node to avoid GC issues
    target.next = null
    this.length--
    return true
  }

  next(item) {
    const pointer = this.search(item)
    return (pointer && pointer.next) || null
  }

  search(item) {
    let pointer = this.head
    while (pointer !== null && pointer.data !== item) {
      pointer = pointer.next
    }
    return pointer
  }
}

module.exports = LinkedList