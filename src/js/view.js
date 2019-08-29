/**
 * author sdh
 *
 */
import {
  qs,
  qsa,
  $on,
  $delegated,
  appendChild,
  createElement
} from './util/common.js'

function View() {
  this.todoList = qs('.todo-list')
  this.newTodo = qs('.new-todo')
  this.todoCount = qs('.todo-count')
  this.footer = qs('.footer')
  this.toggleAll = qs('#toggle-all')
  this.clear = qs('.clear-completed')
  this.filter = qs('.filters')
  this.init()
}

function createTemplate(item) {
  let html = `<li data-id="${item.id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          item.completed ? 'checked' : ''
        }>
        <label>${item.title}</label>
        <a href="javascript:;" class="destroy"></a>
      </div>
    </li>`
  return html
}

View.prototype.init = function() {
  this.editingAction()
}

View.prototype.showList = function(data = []) {
  let list = new Array()
  data.forEach(item => {
    let html = createTemplate(item)
    list.push(html)
  })
  this.todoList.innerHTML = list.join('')
}

View.prototype.addItem = function(item) {
  let html = createTemplate(item)
  appendChild(this.todoList, html)
}

View.prototype.removeItem = function(id) {
  let li = qs(this.todoList, `[data-id="${id}"]`)
  this.todoList.removeChild(li)
}

View.prototype.setTodoCount = function(count) {
  this.todoCount.innerHTML = `<strong>${count}</strong> ${
    count > 1 ? 'items' : 'item'
  } left`
}

View.prototype.clearVisible = function(visible) {
  this.clear.style.display = visible ? 'block' : 'none'
}

View.prototype.setToggleAll = function(value) {
  this.toggleAll.checked = value
}

View.prototype.toggleAllVisible = function(value) {
  let toggleAll = qs('[for="toggle-all"]')
  toggleAll.style.visibility = value ? 'visible' : 'hidden'
}

View.prototype.footerVisible = function(value) {
  this.footer.style.display = value ? 'block' : 'none'
}

View.prototype.getFilter = function() {
  return qs(this.footer, '.selected').innerText.toLowerCase()
}

View.prototype.setItem = function(todo) {
  if (todo) {
    let item = qs(this.todoList, `[data-id="${todo.id}"]`)
    if (todo.title) {
      qs(item, 'label').innerHTML = todo.title
    }
    if (todo.completed) {
      qs(item, '.toggle').innerHTML = todo.completed
    }
  }
}

View.prototype.addTodoAction = function(callback) {
  $on(this.newTodo, 'keyup', function(e) {
    if (e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        callback && callback(e.target.value)
        e.target.value = ''
      }
    }
  })
}

View.prototype.delAction = function(callback) {
  $delegated(this.todoList, '.destroy', 'click', e => {
    let li = e.target.parentNode.parentNode
    callback && callback(li.getAttribute('data-id'))
  })
}

View.prototype.toggleAction = function(callback) {
  $delegated(this.todoList, '.toggle', 'click', e => {
    let li = e.target.parentNode.parentNode
    callback && callback(li.getAttribute('data-id'), e.target.checked, e.target)
  })
}

View.prototype.toggleAllAction = function(callback) {
  $on(this.toggleAll, 'change', function(e) {
    callback && callback(e)
  })
}

View.prototype.clearAction = function(callback) {
  $on(this.clear, 'click', function(e) {
    callback && callback(e)
  })
}

View.prototype.filterAction = function(callback) {
  $delegated(this.filter, 'a', 'click', e => {
    let selectedFilter = e.target
    let filters = qsa(this.filter, 'a')
    filters.forEach(filter => {
      filter.classList.remove('selected')
    })
    selectedFilter.classList.add('selected')
    callback && callback(selectedFilter.innerText)
  })
}

View.prototype.editingAction = function() {
  $delegated(this.todoList, 'label', 'dblclick', e => {
    let view = e.target.parentNode
    let li = view.parentNode
    li.classList.add('editing')
    let edit = createElement(
      `<input type="text" class="edit" value="${e.target.innerText}">`
    )
    li.appendChild(edit)
    edit.focus()
    // 把光标移至文本选择框最末尾
    edit.selectionStart = e.target.innerText.length
  })
}

View.prototype.editedAction = function(callback) {
  let handler = function (e) {
    let edit = e.target
    let li = e.target.parentNode
    li.classList.remove('editing')
    try {
      edit.remove()
      if (edit.value.trim() !== '') {
        callback && callback(li.getAttribute('data-id'), edit.value)
      }
    } catch (error) {
      console.log('node updated')
    }
  }
  $delegated(this.todoList, '.edit', 'blur', e => {
    handler(e)
  })
  $delegated(this.todoList, '.edit', 'keyup', e => {
    if (e.keyCode === 13) {
      handler(e)
    }
  })
}

export default View
