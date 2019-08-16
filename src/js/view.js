/**
 * author sdh
 *
 */
import { qs, qsa, $on, $delegated, appendChild } from "./util/common.js";

function View() {
  this.todoList = qs(".todo-list");
  this.newTodo = qs(".new-todo");
  this.todoCount = qs(".todo-count");
  this.footer = qs(".footer");
  this.toggleAll = qs('#toggle-all');
  this.clear = qs('.clear-completed');
  this.filter = qs('.filters');
}

function createTemplate(item) {
  let html = `<li data-id="${item.id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${item.completed ? 'checked': ''}>
        <label>${item.title}</label>
        <a href="javascript:;" class="destroy"></a>
      </div>
    </li>`;
  return html;
}

View.prototype.showList = function(data = []) {
  let list = new Array();
  data.forEach(item => {
    let html = createTemplate(item);
    list.push(html);
  });
  this.todoList.innerHTML = list.join("");
};

View.prototype.addItem = function(item) {
  let html = createTemplate(item)
  appendChild(this.todoList, html)
};

View.prototype.removeItem = function (id) {
  let li = qs(this.todoList,`[data-id="${id}"]`)
  this.todoList.removeChild(li)
}

View.prototype.setTodoCount = function (count) {
  this.todoCount.innerHTML =
      `<strong>${ count }</strong> ${count > 1 ? 'items': 'item'} left`
}

View.prototype.clearVisible = function (visible) {
  this.clear.style.display = visible ? 'block': 'none'
}

View.prototype.setToggleAll = function (value) {
  this.toggleAll.checked = value
}

View.prototype.toggleAllVisible = function (value) {
  let toggleAll = qs('[for="toggle-all"]')
  toggleAll.style.visibility = value ? 'visible': 'hidden'
}

View.prototype.footerVisible = function (value) {
  this.footer.style.display = value ? 'block': 'none'
}

View.prototype.newTodoAction = function (callback) {
  $on(this.newTodo, 'keyup', function (e) {
    if (e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        callback && callback(e.target.value)
        e.target.value = ''
      }
    }
  })
}

View.prototype.delAction = function (callback) {
  $delegated(this.todoList, '.destroy', 'click', e => {
    let li = e.target.parentNode.parentNode;
    callback && callback(li.getAttribute('data-id'));
  })
}

View.prototype.toggleAction = function (callback) {
  $delegated(this.todoList, '.toggle', 'click', e => {
    let li = e.target.parentNode.parentNode;
    callback && callback(li.getAttribute('data-id'), e.target.checked, e.target);
  })
}

View.prototype.toggleAllAction = function (callback) {
  $on(this.toggleAll, 'change', function (e) {
    callback && callback(e)
  })
}

View.prototype.clearAction = function (callback) {
  $on(this.clear, 'click', function (e) {
    callback && callback(e)
  })
}

View.prototype.filterAction = function (callback) {
  $delegated(this.filter, 'a', 'click', e => {
    let selectedFilter = e.target
    let filters = qsa(this.filter, 'a')
    filters.forEach(filter => {
      filter.classList.remove('selected')
    })
    selectedFilter.classList.add('selected')
    callback && callback(selectedFilter.innerText);
  })
}

export default View;
